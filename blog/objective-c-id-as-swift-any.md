---
title: "Objective-C id 作为 Swift Any"
date: 2016-10-28
categories: 
  - "swift-blog"
---

Swift 3 与 Objective-C 的 API 接口比以前的版本更好用了。比如说，Swift 2 把 Objective-C 中的id 映射为 Swift 中的AnyObject ，它一般能储存类类型的值。Swift 2 同样为一些桥接的值类型提供了隐式的AnyObject  ，比如说String 、Array 、Dictionary 、Set 以及某些数值，作为一种 Swift 原生类型可以方便地应用在 Cocoa API 上的便捷方式，比如 NSString 、NSArray 、或者其他来自 Foundation 的容器类型。这些转换与其他语言不一致，这就导致了让人很难理解究竟什么被用作了AnyObject ，从而玩出 Bug。

在 Swift 3 中，Objective-C 中的id 类型现在映射为 Swift 中的Any ，它描述了一个任意类型的值，无论是类、枚举、结构体还是其他 Swift 类型。这个变化致使 Objective-C API 在 Swift 中更加灵活，因为 Swift 中定义的值类型可以传送到 Objective-C API 中并作为 Swift 类型展开，消除了手动“包装”类型的需求。这些好处同时扩展了集合：Objective-C 集合类型NSArray 、NSDictionary 以及NSSet ，它先前只接受AnyObject ，现在可以包含Any 类型。对于哈希容器，比如Dictionary 和Set ，现在有新的类型AnyHashable 能保存任何遵循 Swift 中Hashable 协议的类型。总的来说，从 Swift 2 到 Swift 3 的类型映射改动如下表：

  
| Objective-C | Swift 2 | Swift 3 |
| --- | --- | --- |
| id | AnyObject | Any |
| NSArray \* | \[AnyObject\] | \[Any\] |
| NSDictionary \* | \[NSObject: AnyObject\] | \[AnyHashable: Any\] |
| NSSet \* | Set<NSObject> | Set<AnyHashable> |

很多情况下，你的代码就不会受到这个改变的影响。Swift 2 中隐式转换为AnyObject 的代码在 Swift 3 中还是会照常作为Any运作。总之，还是有一些地方比如你声明的变量和方法需要改变并在 Swift 3 中获得最好的体验。同时，从 Swift 3 开始，在对象和值类型不能再隐式转换，如果你的代码显式地使用AnyObject 或者 Cocoa 类比如NSString 、NSArray 或者NSDictionary ，你就得引入更多显式地使用as NSString 或者as String 转换。Xcode 中的自动迁移工具在你从 Swift 2 迁移到 Swift 3 时将做最小的改动来保证你的代码可编译，但结果可能不能总是完美。这篇文章将描述一些你需要做的改动，以及一些获得id 作为Any 优势时需要规避的陷阱。

## 重写方法和遵循协议

当子类化一个 Objective-C 类并且重写它的方法、或者说遵循一个 Objective-C 协议时，在父类方法在 Objective-C 中使用时方法的类型特征就需要更新。某些通用的例子是NSObject 类的isEqual: 方法以及NSCopying 协议的copyWithZone: 方法。在 Swift 2 中，你可能会写一个 NSObject  的子类以遵循NSCopying 比如这样：

```
// Swift 2
class Foo: NSObject, NSCopying {
	override func isEqual(_ x: AnyObject?) -> Bool { ... }
	func copyWithZone(_ zone: NSZone?) -> AnyObject { ... }
}
```

在 Swift 3，为了做从 copyWithZone(\_:) 到copy(with:) 命名改变，你同样需要改变这些方法的特征来使用Any 而不是AnyObject ：

```
// Swift 3
class Foo: NSObject, NSCopying {
	override func isEqual(_ x: Any?) -> Bool { ... }
	func copy(with zone: NSZone?) -> Any { ... }
}
```

## 无类型集合

属性列表，JSON以及用户信息字典在 Cocoa 中是通用的，并且 Cocoa 原生地把这些表示为无类型集合。在 Swift 2 中，必须用AnyObject 或者NSObject 元素来建立Array 、Dictionary 或者Set ，依托于隐式绑定转换来处理值类型：

```
// Swift 2
struct State {
	var name: String
	var abbreviation: String
	var population: Int

	var asPropertyList: [NSObject: AnyObject] {
		var result: [NSObject: AnyObject] = [:]
		// Implicit conversions turn String into NSString here…
		result["name"] = self.name
		result["abbreviation"] = self.abbreviation
		// …and Int into NSNumber here.
		result["population"] = self.population
		return result
	}
}

let california = State(name: "California",
					   abbreviation: "CA",
					   population: 39_000_000)
NSNotification(name: "foo", object: nil,
			   userInfo: california.asPropertyList)
```

或者，你可能使用 Cocoa 容器类型，比如NSDictionary ：

```
// Swift 2
struct State {
	var name: String
	var abbreviation: String
	var population: Int

	var asPropertyList: NSDictionary {
		var result = NSMutableDictionary()
		// Implicit conversions turn String into NSString here…
		result["name"] = self.name
		result["abbreviation"] = self.abbreviation
		// …and Int into NSNumber here.
		result["population"] = self.population
		return result.copy()
	}
}
let california = State(name: "California",
					   abbreviation: "CA",
					   population: 39_000_000)
// NSDictionary then implicitly converts to [NSObject: AnyObject] here.
NSNotification(name: "foo", object: nil,
			   userInfo: california.asPropertyList)
```

在 Swift 3 中，隐式转换不再存在了，所以上边的代码都不会正常运行了。迁移工具可能会建议使用as 单独地转换每一个值来保证这个代码正常运行，但这里有更好的解决办法。Swift 现在引入 Cocoa API 作为Any 和（或）AnyHashable 的可接受集合，所以我们可以改变集合的类型来使用\[AnyHashable: Any\] 代替\[NSObject: AnyObject\] 或者NSDictionary ，而不需要改变其他任何代码：

```
// Swift 3
struct State {
	var name: String
	var abbreviation: String
	var population: Int

	// Change the dictionary type to [AnyHashable: Any] here...
	var asPropertyList: [AnyHashable: Any] {
		var result: [AnyHashable: Any] = [:]
		// No implicit conversions necessary, since String and Int are subtypes
		// of Any and AnyHashable
		result["name"] = self.name
		result["abbreviation"] = self.abbreviation
		result["population"] = self.population
		return result
	}
}
let california = State(name: "California",
					   abbreviation: "CA",
					   population: 39_000_000)
// ...and you can still use it with Cocoa API here
Notification(name: "foo", object: nil,
			 userInfo: california.asPropertyList)
```

## AnyHashable  类型

Swift 的Any 类型可以处理任何类型，但Dictionary 和Set 需要Hashable 的键，所以Any 太通用而不能使用。从 Swift 3 开始，Swift 标准库提供一个新的AnyHashable 类型，与Any 类似，它作为所有的Hashable 类型的父类，所以String 、Int 以及其他可哈希的类型可以被隐式地作为AnyHashable 值，并且在AnyHashable 之下的类型可以使用is 、as! 、as? 搭台转换符号来动态地检查。AnyHashable 会在从 Objective-C 引入无类型NSDictionary 或者NSSet 对象时使用，但它同样在纯 Swift 代码中作为创建牛逼合集或字典时好用。

## 未桥接上下文的显式转换

在确定的限制条件下，Swift 不能自动地桥接 C 和 Objective-C 构造。比如说，一些 C 和 Cocoa API 使用 id \*  指针作为“输出”或者“输入输出”形式参数，并且自从 Swift 无法静态定义指针是如何使用的，它不能在内存中自动地执行桥接转换。万一如此，指针仍旧会显示为UnsafePointer<AnyObject> 。如果你需要操作这些未桥接的 API，你可以显式地桥接转换，在你的代码中显式地使用as Type 或者as AnyObject 。

```
// ObjC
@interface Foo

- (void)updateString:(NSString **)string;
- (void)updateObject:(id *)obj;

@end
```

 

```
// Swift
func interactWith(foo: Foo) -> (String, Any) {
	var string = "string" as NSString // explicit conversion
	foo.updateString(&string) // parameter imports as UnsafeMutablePointer<NSString>
	let finishedString = string as String

	var object = "string" as AnyObject
	foo.updateObject(&object) // parameter imports as UnsafeMutablePointer<AnyObject>
	let finishedObject = object as Any

	return (finishedString, finishedObject)
}
```

额外的，Objective-C 协议在 Swift 中仍然是类限制的，所以你不能让 Swift 结构体或者枚举直接遵循 Objective-C 协议或者通过轻量级的泛型类型使用它们。你需要显式地转换String as NSString ，Array as NSArray 等等，来操作这些协议和 API。

## AnyObject  成员查找

Any 没有与AnyObject 一样的查找魔法方法。这可能会打破某些 Swift 2 中查找属性或者发送信息给无类型 Objective-C 对象。比如说，这个 Swift 2 代码：

```
// Swift 2
func foo(x: NSArray) {
	// Invokes -description by magic AnyObject lookup
	print(x[0].description)
}
```

将会报错description 不是 Swift 3 中Any 的成员。你可以用x\[0\] as AnyObject 转换来动态取回之前的行为：

```
// Swift 3
func foo(x: NSArray) {
	// Result of subscript is now Any, needs to be coerced to get method lookup
	print((x[0] as AnyObject).description)
}
```

或者，强制转换值为你需要的具体对象类型：

```
func foo(x: NSArray) {
	// Cast to the concrete object type you expect
	print((x[0] as! NSObject).description)
}
```

## Objective-C 中 Swift 值类型

Any 可以处理_任何_结构体、枚举、元组或者其他你在 Swift 语言中可以定义的类型。Swift 3 中的 Objective-C 桥接可以相反表示任何 Swift 值作为兼容id 的对象到 Objective-C。这能让 Cocoa 容器、userInfo 字典以及其他对象中储存自定义 Swift 值类型更加简单。比如说，在 Swift 2 中，你可能要么在类中改变数据类型，要么手动包装它们，好把它们放进NSSotification ：

```
// Swift 2
struct CreditCard { number: UInt64, expiration: NSDate }

let PaymentMade = "PaymentMade"

// We can't attach CreditCard directly to the notification, since it
// isn't a class, and doesn't bridge.
// Wrap it in a Box class.
class Box<T> {
	let value: T
	init(value: T) { self.value = value }
}

let paymentNotification =
	NSNotification(name: PaymentMade,
				   object: Box(value: CreditCard(number: 1234_0000_0000_0000,
												 expiration: NSDate())))
```

在 Swift 3 中，我们可以不用包装，直接把对象放进通知：

```
// Swift 3
let PaymentMade = Notification.Name("PaymentMade")

// We can associate the CreditCard value directly with the Notification
let paymentNotification =
	Notification(name: PaymentMade,
				 object: CreditCard(number: 1234_0000_0000_0000,
									expiration: Date()))
```

在 Objective-C 中，CreditCard 值将显示为id 兼容，NSObject 遵循的对象，实现了isEqual: 、hash 以及description ，要是在 Swift 中，它使用 Swift 的Equatable 、Hashable 和CustomStringConvertible 实现。对 Swift 来说，值可以通过动态转换为其原本类型来取回：

```
// Swift 3
let paymentCard = paymentNotification.object as! CreditCard
print(paymentCard.number) // 1234000000000000
```

注意，在 Swift 3.0 中，某些 Swift 和 Objective-C 通用结构类型将会桥接为不透明对象而不是习惯上的 Cocoa 对象。举例来说，无论是 Int 、UInt 、Double 和Bool 桥接为NSNumber ，其他有大小的数值类型比如说Int8 、UInt16 等等。Cocoa 结构体比如 CGRect 、CGPoint 以及CGSize 同样桥接为不透明对象，尽管大部分 Cocoa API 可以使用他们作为NSValue 实例的包装。如果你看到比如 unrecognized selector sent to \_SwiftValue 这样的错误，说明 Objective-C 代码正在尝试调用一个不透明 Swift 值类型中的方法，你可能需要手动包装这个值为 Objective-C 代码期望的类型实例。

一个特殊的需要注意的问题是可选项。Swift 中的Any 可以处理_所有内容_，包括可选项，所以就有可能转一个可选项给 Objective-C API 而没有事先检查它，就算 API 声明为接收非空id 。这通常就会搞出一个涉及 \_SwiftValue 的运行时错误而不是一个编译时错误。包含在 Xcode 8.1 beta 中的 Swift 3.0.1 可以实现这些处理数字类型、Objective-C 结构体以及通过定位上述NSNumber 、NSValue 和可选绑定限制穿透可选项：

- [SE–0139: 桥接数字类型到NSNumber和 Cocoa 结构体到 NSValue](https://github.com/apple/swift-evolution/blob/master/proposals/0139-bridge-nsnumber-and-nsvalue.md)
- [SE–0140: 在可选项转换到Any以及桥接可选项作为内容或者NSNull时警告](https://github.com/apple/swift-evolution/blob/master/proposals/0140-bridge-optional-to-nsnull.md)

要避免向前的兼容问题，考虑到未来版本的 Swift 可能允许更多 Swift 类型桥接到符合语言习惯的 Objective-C 类型上，你不应该依赖\_SwiftValue 类不透明对象的实现细节。

## Linux 的可移植性

Swift 程序依靠 Swift 核心库运行在 Linux 上，它是一个使用 Swift 写的原生 Foundation 版本，无需 Objective-C 运行时来桥接。 id 即Any 允许核心库来直接使用原生Any 和标准库值类型，同时保持了与苹果平台使用 Objective-C Foundation 实现的兼容。自从 Swift 不再在 Linux 上与 Objective-C 进行交互，也就不再支持桥接转换比如string as NSString 或者value as AnyObject 。想要在在 Cocoa 和 Swift 核心库之间移植 Swift 代码，就应当仅使用值类型。

## 了解更多

id 即Any 是一个 Swift 语言受早期 Swift 版本用户反馈并从开源 Swift 演进进程中受到启发而提升的重要范例。如果你想要了解更多关于id 即Any 背后的动机和设计决定，原本的 Swift 演进提议在 GitHub 的 swift-evolution 仓库中可见：

- [SE-0072: Fully eliminate implicit bridging conversions from Swift](https://github.com/apple/swift-evolution/blob/master/proposals/0072-eliminate-implicit-bridging-conversions.md)
- [SE–0116: Import Objective-C id as Swift Any type](https://github.com/apple/swift-evolution/blob/master/proposals/0116-id-as-any.md)
- [SE–0131: Add AnyHashable to the standard library](https://github.com/apple/swift-evolution/blob/master/proposals/0131-anyhashable.md)

最终的结果就是，Swift 是一门更加一致的语言，Cocoa API 由 Swift 的使用变得更加强大。
