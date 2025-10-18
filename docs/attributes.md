---
title: "特性"
date: 2015-08-14
sidebar_position: 57
---

_特性_给有关声明或类型提供更多的信息。在 Swift 中有两种特性，一种用于声明，另一种用于类型。

通过在@ 符号后跟一个特性名称和该特性可以接受的实际参数来指定一个特性：

```
@ attribute name

@ attribute name ( attribute arguments )
```

一些接受实际参数的声明特性指定了更多关于它的信息和它们如何应用到特定的声明中。这些_特性实际参数_写在一对括号里，其格式由它们所属的特性定义。

## 声明特性

声明特性只能应用于声明中。

### attached

将attached 应用于宏声明。该属性的参数表示宏的角色。对于具有多个角色的宏，可多次应用附加宏，每个角色应用一次。

此属性的第一个参数表示宏的角色：

同行宏

将 peer  写为此属性的第一个参数。实现宏的类型遵循 PeerMacro  协议。这些宏产生的新声明与宏所连接的声明在同一作用域。例如，将对等宏应用于结构体的方法，就可以在该结构体上定义额外的方法和属性。

成员宏

将member 作为此属性的第一个参数。实现宏的类型遵循MemberMacro 协议。这些宏产生的新声明是宏所连接的类型或扩展的成员。例如，对结构体声明应用成员宏，可以在该结构体上定义额外的方法和属性。

成员特性

将 memberAttribute  作为此属性的第一个参数。实现该宏的类型遵循MemberAttributeMacro 协议。这些宏可为宏所连接的类型或扩展名的成员添加属性。

访问宏

将 accessor  写为该属性的第一个参数。实现宏的类型遵循 AccessorMacro  协议。这些宏将访问器添加到所连接的存储属性中，使其成为一个计算属性。

扩展宏

将extension 作为第一个参数写入此属性。实现宏的类型遵循 ExtensionMacro  协议。这些宏可以添加协议符合性、where  子句以及作为宏所连接类型成员的新声明。如果宏添加了协议一遵循，包括遵循：参数并指定这些协议。遵循列表包含协议名称、引用符合性列表项的类型别名或符合性列表项的协议组合。嵌套类型的扩展宏会扩展到该文件顶层的扩展。不能在扩展名、类型别名或嵌套在函数中的类型上编写扩展宏，也不能使用扩展宏来添加已存在同级宏的扩展名。

对等宏、成员宏和访问宏角色需要 names:  参数，列出宏生成的符号名称。如果宏在扩展名中添加了声明，扩展名宏角色也需要 names:  参数。当宏声明包含 names:  参数时，宏实现必须只生成名称与该列表相匹配的符号。也就是说，宏不必为每个列出的名称生成一个符号。该参数的值是以下一个或多个名称的列表：

- `named(<#name#>)` 当 _name_ 是固定符号名称, 已经提前知道的名称
- `overloaded` 和现有符号相同的名称.
- `prefixed(<#prefix#>)` 当 _prefix_ 已经在符号名称前面, 为那些以固定字符串开头的名称.
- `suffixed(<#suffix#>` 当 _suffix_ 添加到名称后面, 为那些以固定字符串结束的名称.
- `arbitrary` 为那些在宏展开前无法确定的名称.

特殊情况下，你可以给宏写prefixed($) ，它会有和属性包装有类似的行为。

### available

把这个特性应用到任意声明中，以指出该声明相对于特定平台和操作系统版本的生命周期。

available 特性总是和两个或两个以上用逗号隔开的特性实际参数列表同时出现。实际参数列表中的第一个参数是下列平台名称之一：

- iOS
- iOSApplicationExtension
- macOS
- macOSApplicationExtension
- macCatalyst
- macCatalystApplicationExtension
- watchOS
- watchOSApplicationExtension
- tvOS
- tvOSApplicationExtension
- visionOS
- visionOSApplicationExtension
- swift

你也可以用星号(\* )指明一个声明在上述所有平台中都可用。

其余实际参数可以按任何顺序出现，它们指定关于声明生命周期的其他信息，包括重要的里程碑。

- unavailable 实际参数表示其声明不能用于特定的平台上。
- introduced 实际参数表示引入声明的特定平台的最低版本。其格式如下所示：

introduced: version number

_version number_ 由一个或一个以上正整数组成，用小数点隔开。

- deprecated 实际参数表示弃用声明的特定平台的最低版本。其格式如下所示：

deprecated: version number

可选的 _version number_ 由一个或一个以上正整数组成，用小数点隔开。不写版本号表示现在弃用了该声明，不给出任何关于该声明何时被弃用的信息。如果你不写版本号，也不要写冒号(: )。

- obsoleted 实际参数表示废弃声明的特定平台的最低版本。当一个声明被废弃之后，它就从特定的平台移除了，以后不能再使用。其格式如下所示：

obsoleted: version number

_version number_ 由一个或一个以上正整数组成，用小数点隔开。

- message 实际参数用于显示那些，由于使用了被弃用或被作废的声明而编译器显示的警告或错误文本信息。其格式如下所示：

message: message

_message_ 实际参数由字符串字面量组成。

- renamed 实际参数用于提供改了名称的声明的新名字。使用已经改了名称的声明时会发生错误，这时编译器会显示其新名字。格式如下所示：

renamed: new name

_new name_ 由字符串字面量组成。

你可以结合unavailable 实际参数和类型别名声明使用renamed 实际参数，告诉你代码的使用者，声明已经改名字了。例如，发布一个框架或静态库时有一个声明的名称会改变，这是就很有用。

```
// First release
protocol MyProtocol {
    // protocol definition
}
```

```
// Subsequent release renames MyProtocol
protocol MyRenamedProtocol {
    // protocol definition
}
 
@available(*, unavailable, renamed: "MyRenamedProtocol")
typealias MyProtocol = MyRenamedProtocol
```

你可以在单个声明中使用多个available 特性，以指定该声明在不同平台上是否可用。只有当前编译目标的平台和一个属性中指定的平台相同时，编译器才会使用这个available 特性。

如果一个available 特性除了一个平台名称实际参数外只指定一个introduced 实际参数，可以使用下面的简化语法：

```
@available(platform name version number, *)
@available(swift version number)
```

available 特性的简化语法允许简洁地表示多个平台的可用性。尽管两种格式功能上是一样的，只要有可能，尽量使用简化语法。

```
@available(iOS 10.0, macOS 10.12, *)
class MyClass {
    // class definition
}
```

available 特性标明了 Swift 版本可用性不能再额外地标明声明的平台可用性。相反，使用多个available 特性标明 Swift 版本可用性和一个或多个平台可用性。

```
@available(swift 3.0.2)
@available(macOS 10.12, *)
struct MyStruct {
    // struct definition
}
```

### backDeployed

将此特性应用于函数、方法、下标或计算属性，可在调用或访问符号的程序中包含符号实现的副本。使用此特性可注释作为平台一部分的符号，如操作系统中包含的 API。该属性标记的符号可以通过在访问这些符号的程序中包含其实现的副本来追溯使用。复制实现也被称为_发射到__客户端_。

该属性使用 before:  参数，指定提供该符号的平台的第一个版本。这些平台版本的含义与为 available  特性指定的平台版本相同。与 available  特性不同的是，列表中不能包含星号 (\* ) 来指代所有版本。例如，请看下面的代码：

```
@available(iOS 16, *)
@backDeployed(before: iOS 17)
func someFunction() { /* ... */ }
```

在上例中，iOS SDK 从 iOS 17 开始提供 someFunction() 。此外，SDK 还在 iOS 16 上使用后向部署提供了 someFunction() 。

在编译调用此函数的代码时，Swift 会插入一层间接层来查找函数的实现。如果使用包含该函数的 SDK 版本运行代码，则会使用 SDK 的实现。否则，将使用调用者中包含的副本。在上面的示例中，在 iOS 17 或更高版本上运行时，调用 someFunction()  会使用 SDK 的实现，而在 iOS 16 上运行时，则会使用调用程序中包含的 someFunction()  副本。

> 注意
> 
> 当调用者的最小部署目标与包含该符号的 SDK 的第一个版本相同或大于该版本时，编译器可以优化运行时检查并直接调用 SDK 的实现。在这种情况下，如果直接访问后部部署的符号，编译器也可以省略客户端中的符号实现副本。

符合以下条件的函数、方法、下标和计算属性可以反向部署：

- 声明为 public  或 @usableFromInline ；
- 对于类实例方法和类类型方法，方法标记为 final  且未标记 @objc ；
- 实现符合 inlinable 中描述的可内联函数的要求。

### discardableResult

把这个特性用在函数或方法的声明中，当调用一个有返回值的函数或者方法却没有使用返回值时，编译器不会产生警告。

### dynamicCallable

为类、结构体、枚举或者协议添加这个特性来将这个类型的实例视为可调用函数。类型要么实现dynamicallyCall(withArguments:) 方法，要么实现dynamicallyCall(withKeywordArguments:) ，当然两者都实现也行。

你可以调用一个可动态调用类型的实例，就好像它是一个函数并接收任意数量的实际参数。

```
@dynamicCallable
struct TelephoneExchange {
    func dynamicallyCall(withArguments phoneNumber: [Int]) {
        if phoneNumber == [4, 1, 1] {
            print("Get Swift help on forums.swift.org")
        } else {
            print("Unrecognized number")
        }
    }
}

let dial = TelephoneExchange()

// Use a dynamic method call.
dial(4, 1, 1)
// Prints "Get Swift help on forums.swift.org".

dial(8, 6, 7, 5, 3, 0, 9)
// Prints "Unrecognized number".

// Call the underlying method directly.
dial.dynamicallyCall(withArguments: [4, 1, 1])
```

方法dynamicallyCall(withArguments:) 的声明必须有唯一的一个遵循[ExpressibleByArrayLiteral](https://developer.apple.com/documentation/swift/expressiblebyarrayliteral) 协议的形式参数——就像上面例子中的\[Int\] ——并且返回类型可以是任意类型。

你可以在动态方法调用中包含标签，如果你实现dynamicallyCall(withKeywordArguments:) 方法的话。

```
@dynamicCallable
struct Repeater {
    func dynamicallyCall(withKeywordArguments pairs: KeyValuePairs<String, Int>) -> String {
        return pairs
            .map { label, count in
                repeatElement(label, count: count).joined(separator: " ")
            }
            .joined(separator: "\n")
    }
}

let repeatLabels = Repeater()
print(repeatLabels(a: 1, b: 2, c: 3, b: 2, a: 1))
// a
// b b
// c c c
// b b
// a
```

方法dynamicallyCall(withKeywordArguments:) 的声明必须有唯一的一个遵循[ExpressibleByDictionaryLiteral](https://developer.apple.com/documentation/swift/expressiblebydictionaryliteral) 协议的形式参数，并且返回类型可以是任意类型。形式参数的Key 必须是[ExpressibleByStringLiteral](https://developer.apple.com/documentation/swift/caseiterable) 。先前的例子使用KeyValuePairs 作为形式参数类型，所以调用者可以包含重复形式参数标签——a 和b 被使用了多次来repeat 。

如果你同时实现两个dynamicallyCall 方法，dynamicallyCall(withKeywordArguments:) 会在方法调用包含关键字实际参数时调用。否则，dynamicallyCall(withArguments:) 会被调用。

你只能使用实际参数调用动态调用实例并且返回类型匹配你在dynamicallyCall 实现中写明的类型。下面例子中的调用方法不会通过编译因为没有接收KeyValuePairs<String, String> 的dynamicallyCall(withArguments:) 实现。

```
repeatLabels(a: "four") // Error
```

### dynamicMemberLookup

应用这个特性到类、结构体、枚举或者协议来允许在运行时可通过名字查找成员。类型必须实现一个subscript(dynamicMemberLookup:) 下标脚本。

在一个显式的成员表达式中，如果没有这个命名成员的相关声明，表达式则理解为subscript(dynamicMemberLookup:)  下标脚本，传入一个包含成员名字的字符串字面量作为实际参数。下标脚本的形式参数类型可以是任意遵循ExpressibleByStringLiteral 协议的类型，它返回的类型可以是任意类型。大多数情况下，下标脚本的形式参数是一个String 值。举例来说：

```
@dynamicMemberLookup
struct DynamicStruct {
    let dictionary = ["someDynamicMember": 325,
                      "someOtherMember": 787]
    subscript(dynamicMember member: String) -> Int {
        return dictionary[member] ?? 1054
    }
}
let s = DynamicStruct()

// Using dynamic member lookup
let dynamic = s.someDynamicMember
print(dynamic)
// Prints "325"

// Calling the underlying subscript directly
let equivalent = s[dynamicMember: "someDynamicMember"]
print(dynamic == equivalent)
// Prints "true"
```

### dynamicMemberLookup

应用这个特性到类、结构体、枚举或者协议来允许成员在运行时可通过名称检索。类型必须实现subscript(dynamicMemberLookup:) 下标。

在显式成员表达式中，如果没有相关声明符合命名的名称，表达式会理解并调用类型的subscript(dynamicMemberLookup:) 下标，传入关于成员的信息作为实际参数。下标可接受一个形式参数，要么是 key path 要么是成员名称；如果你两个下标都实现，那么接受的 key path 实际参数会被使用。

subscript(dynamicMemberLookup:) 的实现可以通过实际参数类型KeyPath 、WritableKeyPath 或者ReferenceWritableKeyPath 来接受 key path。它可以接受成员名称作为实际参数，实际参数必须是遵循ExpressibleByStringLiteral 协议的类型——大多数情况下，String 。下标的返回类型可以是任意类型。

通过成员名进行动态成员查询可以用于对那些在编译时不能进行类型检查的数据创建封装类型，比如从其他语言桥接到 Swift。举例来说：

```
@dynamicMemberLookup
struct DynamicStruct {
    let dictionary = ["someDynamicMember": 325,
                      "someOtherMember": 787]
    subscript(dynamicMember member: String) -> Int {
        return dictionary[member] ?? 1054
    }
}
let s = DynamicStruct()

// Use dynamic member lookup.
let dynamic = s.someDynamicMember
print(dynamic)
// Prints "325"

// Call the underlying subscript directly.
let equivalent = s[dynamicMember: "someDynamicMember"]
print(dynamic == equivalent)
// Prints "true"
```

通过 key path 动态成员查找可用于实现支持编译时类型检查的封装。比如说：

```
struct Point { var x, y: Int }

@dynamicMemberLookup
struct PassthroughWrapper<Value> {
    var value: Value
    subscript<T>(dynamicMember member: KeyPath<Value, T>) -> T {
        get { return value[keyPath: member] }
    }
}

let point = Point(x: 381, y: 431)
let wrapper = PassthroughWrapper(value: point)
print(wrapper.x)
```

### frozen

给结构体或者枚举声明添加此特性来限制你可对此类型能做的变更种类。这个特性仅在库演进模式编译中允许使用。未来版本的库不能通过添加、删除、改变枚举情况或者是改变结构体存储实例属性的顺序来改变声明。这些改变在不冻结的类型中允许，但它们会打乱冻结类型的 ABI 兼容性。

> 注意
> 
> 当编译器不在库演进模式时，所有的结构体和枚举都隐式冻结，并且你也不能使用这个特性。

在库演进模式中，与非冻结结构体和枚举交互的代码用一种允许无需重新编译就可以持续运行的方式进行编译，就算将来的库版本增加、删除或者重新排序了类成员没关系。编译器通过使用例如查询运行时信息以及添加中间层等技术实现这一功能。把结构体或者枚举标记为冻结则放弃了这个弹性机制，但获得了更多性能：未来版本的库只能对类做有限更改，但编译器可以对与类成员交互的代码进行更多优化。

冻结类，冻结结构体中的存储属性类型，以及枚举情况的关联值必须是 public 或者标记有usableFromInline 特性。冻结结构体的属性不能添加属性观察者，另外如同 [inlinable](https://www.cnswift.org/attributes#inlinable) 小节中讨论的那样，给存储实例属性添加初始值的表达式必须遵守与行内函数相同的限制。

冻结枚举的 switch 语句不需要default 情况，如同在将来的枚举中 switch 中说的那样，当你在 switch 冻结枚举时包括default 或者@unknown default 的情况，就会看到一个警告，因为代码永远不会被执行。

### GKInspectable

用这个特性可以把一个自定义的 GameplayKit 组件属性显示到 SpriteKit 编辑器界面中。使用这个特性也就隐式地使用了objc 特性

### inlinable

给函数、方法、计算属性、下标脚本、便捷初始化器或者反初始化器的声明中应用这个特性来暴露这个声明的实现作为模块的公开接口。这就允许编译器在调用时替换行内符号为这个符号具体实现的拷贝。

这个特性不能应用在内嵌函数或者fileprivate  和private  声明中。定义在行内函数内的行数和闭包会隐式地允许行内，尽管它们没有被标记这个特性。

### main

把这个特性应用到结构体、类或枚举声明中，来表明它在程序流程中包含顶层入口。类型必须提供一个不接收任何实际参数并且返回Void 的main 类型函数。比如说：

```
@main
struct MyTopLevel {
    static func main() {
        // Top-level code goes here
    }
}
```

另一种描述main 特性需求的方式是你给应用这个特性的类必须作为遵循下面假设协议的类满足相同需求：

```
protocol ProvidesMain {
    static func main() throws
}
```

如同[顶层代码](https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID352)中讨论的那样，你编译成可执行文件的 Swift 代码最多只能包含一个顶层入口。

### nonobjc

把这个特性应用到一个方法，属性，下标，或者初始化器的声明中，废除一个隐式objc 特性 。尽管有可能在 Objective-C 中表示一个声明，nonobjc 特性告诉编译器，使其声明在 Objective-C 代码中不可用。

给扩展使用这个特性与对扩展中的所有不显式地用objc 特性标记的成员使用是一样的效果。

对于一个标为objc 特性的类中桥接的方法，你可以使用nonobjc 特性解决其循环性，并且允许重载标为objc 特性的类中的方法和初始化器。

一个标记为nonobjc 特性的方法不能重写标为objc 特性的方法。但是，一个标记为objc 特性的方法可以重写一个标为nonobjc 特性的方法。同样，一个标为nonobjc 特性的方法不能满足一个标为objc 特性方法的协议需求。

### NSApplicationMain

> 过时
> 
> 这个特性已经过时了；请使用 [main](https://www.cnswift.org/attributes#main) 特性代替。在将来 Swift 6 中，这个特性会导致报错。

将这个特性应用于一个类中，来指明它是应用的委托。用这个特性等同于调用 NSApplicationMain(\_:\_:) 函数。

如果你不使用这个特性，需要提供一个main.swift 文件，在其代码的最上层调用如下 NSApplicationMain(\_:\_:) 函数：

```
import AppKit
NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
```

### NSCopying

这个特性用于一个类的可变存储属性中。这个特性让属性值（由copyWithZone(\_:) 方法返回，而不是属性本身的值）的_拷贝_合成属性的setter。属性的类型必须遵循NSCopying 协议。

从某种程度上来说，NSCopying 特性的行为类似 Objective-C 中的copy 属性特性。

### NSManaged

把这个特性应用于一个继承自NSManagedObject 的类的实例方法或可变存储属性中，以指明 Core Data 会在运行时根据相关的实体描述动态提供它的实现。对于标记为NSManaged 特性的属性，Core Data 还会在运行时提供存储。用这个特性还隐含objc 特性。

### objc

把这个特性用到任何可以在 Objective-C 中表示的声明上——例如，非内嵌类，协议，非泛型枚举（原始值类型只能是整数），类和协议的属性、方法（包括 setter 和 getter ），初始化器，反初始化器，下标。objc 特性告诉编译器，这个声明在 Objective-C 代码中是可用的。

给扩展应用这个特性与为这个扩展中所有不显式标记为nonobjc 特性的成员应用是一样的效果。

用objc 特性标记的类必须继承自一个 Objective-C 中定义的类。如果你把objc 用到类或协议中，它会隐式地应用于该类或协议中 Objective-C 兼容的成员上。如果一个类继承自另一个带objc 特性标记或 Objective-C 中定义的类，编译器也会隐式地给这个类添加objc 特性。标记为objc 特性的协议不能继承自非objc 特性的协议。

objc 特性同样会在下面的情况中隐式地添加：

- 声明是子类的重写，并且父类的声明有objc 特性；
- 声明满足的需求来自一个拥有objc 特性的协议；
- 声明有IBAction , IBOutlet , IBDesignable , IBInspectable , NSManaged , 或者 GKInspectable 特性。

如果你在一个枚举中使用objc 特性，枚举名和每个成员名串联起来，作为枚举成员暴露给 Objective-C 代码。成员名首字母大写。例如，一个 Swift Planet 枚举成员叫做venus ，它作为一个叫PlanetVenus 的成员暴露到 Objective-C 代码中。

objc 特性可以接受一个特性实际参数，由一个标识符组成。当你想在 Objective-C 中为objc 特性标记的实体暴露一个不同的名字时，用这个特性。你可以把这个实际参数用在命名类，枚举，枚举成员，协议，方法，getter，setter，初始化器。下面的例子把ExampleClass 中enabled 属性的 getter 作为isEnabled 暴露给 Objective-C 代码，而不仅仅是属性本身的名字。

```
@objc
class ExampleClass: NSObject {
    var enabled: Bool {
        @objc(isEnabled) get {
            // Return the appropriate value
        }
    }
}
```

### objcMembers

给任何可以拥有objc 特性的类声明添加这个特性。objc 特性会隐式地添加到类的 Objective-C 兼容成员、扩展、子类以及它们所有的扩展。

大多数代码应该使用objc 特性，以今暴露需要的声明。如果泥需要暴露很多声明，你可以用一个带有objc 特性的扩展来给它们打组。这些特性对于那些与 Objective-C 运行时频繁沟通的库来说特别方便。在不需要的时候添加objc 特性会增加你的二进制体积并且对性能有不利的影响。

### propertyWrapper

把这个特性应用给类、结构体或者枚举的声明来把对应的类型作为属性包装器使用。当你给类型使用这个特性时，你就创建了一个与这个类型同名的自定义特性。把这个新的特性应用给类型、结构体或者枚举的属性来使用包装器的实例包装属性的访问；把特性应用给本地存储变量声明以相同方式包装这个变量的访问。计算变量、全局变量和常量不能使用属性包装器。

包装器必须定义一个wrappedValue 实例属性。_包装属性_的值就是这个属性暴露的 getter 和 setter。大多数情况下，wrappedValue 是一个计算值，但也可以是存储值。包装器定义和管理任何被包装值需要的存储。编译器会通过在包装的属性名称前添加下划线（\_ ）来合成对应实例所需要的存储——比如说，someProperty 的包装器会以\_someProperty 的形式存储。包装器合成存储的访问控制权限为private 级。

有属性包装器的属性可包含willSet 和didSet 代码块，但它不能重写编译器合成的get 和set 代码块。

Swift 为属性包装器的初始化过程提供两种形式的语法糖。你可以在被包装值定义时使用赋值语法来把表达式右侧的值作为实际参数赋值给wrappedValue 的属性包装器的初始化器的形式参数中。你也可以在你把特性应用给属性时给特性提供实际参数，这些实际参数会传递给属性的包装器的初始化器。比如说，下边的代码，SomeStruct 调用了SomeWrapper 定义的每一个初始化器。

```
@propertyWrapper
struct SomeWrapper {
    var wrappedValue: Int
    var someValue: Double
    init() {
        self.wrappedValue = 100
        self.someValue = 12.3
    }
    init(wrappedValue: Int) {
        self.wrappedValue = wrappedValue
        self.someValue = 45.6
    }
    init(wrappedValue value: Int, custom: Double) {
        self.wrappedValue = value
        self.someValue = custom
    }
}

struct SomeStruct {
    // Uses init()
    @SomeWrapper var a: Int

    // Uses init(wrappedValue:)
    @SomeWrapper var b = 10

    // Both use init(wrappedValue:custom:)
    @SomeWrapper(custom: 98.7) var c = 30
    @SomeWrapper(wrappedValue: 30, custom: 98.7) var d
}
```

包装属性的投射值就是属性包装器可以用于暴露额外功能的第二个值。属性包装器类型的作者负责决定投射值的意义并且定义暴露的投射值的接口。要从属性包装器中投射值，在包装器类型中定义projectedValue 实例属性。编译器会通过在包装属性名称前添加一个美元符号（$ ）来为投射的值合成标记——比如说，someProperty 投射的值就是$someProperty 。投射的值和原本包装属性有着同样的访问控制级别。

```
@propertyWrapper
struct WrapperWithProjection {
    var wrappedValue: Int
    var projectedValue: SomeProjection {
        return SomeProjection(wrapper: self)
    }
}
struct SomeProjection {
    var wrapper: WrapperWithProjection
}

struct SomeStruct {
    @WrapperWithProjection var x = 123
}
let s = SomeStruct()
s.x           // Int value
s.$x          // SomeProjection value
s.$x.wrapper  // WrapperWithProjection value
```

### resultBuilder

把这个特性应用给类、结构体、枚举来把对应类型作为结果建造器使用。_结果建造器_是一个逐步建造内嵌数据结构的类型。你可使用结果建造器来实现一个自然声明式的领域特定语言（DSL）以创建内嵌数据结构。如何使用resultBuilder 特性及其示例，见[结果建造器](https://www.cnswift.org/advanced-operators#spl-18)。

#### 结果建造方法

一个结果建造器实现了以下静态方法。因为所有结果生成器的功能都通过静态方法暴露出来，所以你不需要初始化该类型的实例。结果生成器必须实现buildBlock(\_:) 方法或buildPartialBlock(first:) 和buildPartialBlock(accumulated:next:) 两个方法中的至少一个。其他方法（用于在DSL中提供附加功能）是可选的。结果生成器类型的声明实际上不需要包含任何协议遵循。

静态方法的描述使用三个类型作为占位符。Expression 类型是结果建造器的输入类型占位符，Component 是部分结果类型的占位符，FinalResult 是结果建造器生成的结果类型的占位符。如果你的结果建造方法不指定Expression 或FinalResult 的类型，那默认会和Component 的类型一致。

结果建造方法有下列几个：

static func buildBlock(\_ components: Component...) -> Component

将部分结果的数组组合成单一部分结果。结果建造器必须实现这个方法。

static func buildPartialBlock(first: Component) -> Component

从第一个组件构建一个部分结果组件。实现这个方法和 buildPartialBlock(accumulated:next:)  方法来支持逐个组件构建块。与 buildBlock(\_:)  相比，这种方法减少了处理不同数量参数的泛型重载的需要。

static func buildPartialBlock(accumulated: Component, next: Component) -> Component

通过将累积的组件与新组件结合起来构建一个部分结果组件。实现这个方法和 buildPartialBlock(first:)  方法来支持逐个组件构建块。与 buildBlock(\_:)  相比，这种方法减少了处理不同数量参数的泛型重载的需要。

结果生成器可以实现上述列出的三种构建块方法；在这种情况下，可用性决定调用哪个方法。默认情况下，Swift 调用 buildPartialBlock(first:)  和 buildPartialBlock(second:)  方法。要使 Swift 调用 buildBlock(\_:) ，请在 buildPartialBlock(first:)  和 buildPartialBlock(second:)  上标记封闭声明的可用性早于您编写的可用性。

static func buildOptional(\_ component: Component?) -> Component

从一个可以是nil 的部分结果建造一个部分结果。实现这个方法以支持不包含else 分句的if 语句。

static func buildEither(first: Component) -> Component

建造一个值依赖其他条件的部分结果。实现这个和buildEither(second:) 来支持switch 语句和包含else 的if 语句。

static func buildEither(second: Component) -> Component

建造一个结果依赖某些条件的部分结果。实现这个和buildEither(first:)

来支持switch 语句和包含else 的if 语句。

static func buildArray(\_ components: \[Component\]) -> Component

从一个部分结果的数组建造一个部分结果。实现这个方法来支持for 循环。

static func buildExpression(\_ expression: Expression) -> Component

从表达式建造一个部分结果。你可以实现这个方法来执行预处理——比如说转换表达式为内部类型——或者在使用时为类型接口提供额外信息。

static func buildFinalResult(\_ component: Component) -> FinalResult

从部分结果建造最终结果。你可以在部分结果和最终结果使用不同类型的结果建造器中实现这个方法，或者在结果返回之前执行其他预处理。

static func buildLimitedAvailability(\_ component: Component) -> Component

建造一个在编译器控制语句外生成或者擦除类型信息的部分结果，以执行可用性检查。你可以使用这个来擦除不同条件分枝中的类型信息。

比如说，下面的代码定义了一个简单的结果建造器，它创建一个整数的数组。这个代码定义了Compontent 和Expression 作为类型别名，好让下面的例子和上面的方法做对应。

```
@resultBuilder
struct ArrayBuilder {
    typealias Component = [Int]
    typealias Expression = Int
    static func buildExpression(_ element: Expression) -> Component {
        return [element]
    }
    static func buildOptional(_ component: Component?) -> Component {
        guard let component = component else { return [] }
        return component
    }
    static func buildEither(first component: Component) -> Component {
        return component
    }
    static func buildEither(second component: Component) -> Component {
        return component
    }
    static func buildArray(_ components: [Component]) -> Component {
        return Array(components.joined())
    }
    static func buildBlock(_ components: Component...) -> Component {
        return Array(components.joined())
    }
}
```

#### 结果转换

接下来的语法转换会递归式应用，来把使用了结果建造器语法的代码转换成调用结果建造器静态方法的调用：

- 如果结果建造器有buildExpression(\_:) 方法，每一个表达式都会变成这个方法的调用。这个转换永远最先执行。比如说，下面的声明是等价的：
    
    ```
    @ArrayBuilder var builderNumber: [Int] { 10 }
    var manualNumber = ArrayBuilder.buildExpression(10)
    ```
    
- 赋值语句会像表达式那样转换，但会被理解为等价() 。你可以定义一个buildExpression(\_:) 的重写，来接受一个类型为() 的实际参数，然后特殊处理赋值行为。
- 检查条件可用性的分枝语句会变成buildLimitedAvailability(\_:) 方法的调用。这个转换会在转换到buildEither(first:) ，buildEither(second:) 或者buildOptional(\_:) 调用之前。你可使用buildLimitedAvailability(\_:) 方法来基于当前执行分枝擦除类型信息。比如说，下面buildEither(first:) 和buildEither(second:) 方法使用了一个范型类型捕捉分枝的类型信息。
    
    ```
    protocol Drawable {
        func draw() -> String
    }
    struct Text: Drawable {
        var content: String
        init(_ content: String) { self.content = content }
        func draw() -> String { return content }
    }
    struct Line<D: Drawable>: Drawable {
        var elements: [D]
        func draw() -> String {
            return elements.map { $0.draw() }.joined(separator: "")
        }
    }
    struct DrawEither<First: Drawable, Second: Drawable>: Drawable {
        var content: Drawable
        func draw() -> String { return content.draw() }
    }
    
    @resultBuilder
    struct DrawingBuilder {
        static func buildBlock<D: Drawable>(_ components: D...) -> Line<D> {
            return Line(elements: components)
        }
        static func buildEither<First, Second>(first: First)
            -> DrawEither<First, Second> {
                return DrawEither(content: first)
        }
        static func buildEither<First, Second>(second: Second)
            -> DrawEither<First, Second> {
                return DrawEither(content: second)
        }
    }
    ```
    
    总之，这个实现会在有可用性检测的代码中导致出现问题：
    
    ```
    @available(macOS 99, *)
    struct FutureText: Drawable {
        var content: String
        init(_ content: String) { self.content = content }
        func draw() -> String { return content }
    }
    @DrawingBuilder var brokenDrawing: Drawable {
        if #available(macOS 99, *) {
            FutureText("Inside.future")  // Problem
        } else {
            Text("Inside.present")
        }
    }
    // The type of brokenDrawing is Line<DrawEither<Line<FutureText>, Line<Text>>>
    ```
    
    在上面的代码中，由于FutureText 是DrawEither 范型类型中的一个，所以以brokenDrawing 类型的一部分出现。如果运行时FutureText 不可用，就会导致你的程序崩溃，就算是这个类型明显不会用到，也是如此。要解决这个问题，实现一个buildLimitedAvailability(\_:) 方法来擦除类型信息。比如，下面的代码从它的可用检查中建造了一个AnyDrawable 值。
    
    ```
    struct AnyDrawable: Drawable {
        var content: Drawable
        func draw() -> String { return content.draw() }
    }
    extension DrawingBuilder {
        static func buildLimitedAvailability(_ content: Drawable) -> AnyDrawable {
            return AnyDrawable(content: content)
        }
    }
    
    @DrawingBuilder var typeErasedDrawing: Drawable {
        if #available(macOS 99, *) {
            FutureText("Inside.future")
        } else {
            Text("Inside.present")
        }
    }
    // The type of typeErasedDrawing is Line<DrawEither<AnyDrawable, Line<Text>>>
    ```
    
- 分枝语句变成一系列buildEither(first:) 和buildEither(second:) 的方法调用。语句的条件和情况会被映射到二叉树的叶子节点中，并且语句变成从根节点到叶子节点内嵌的buildEither 方法调用。

比如说，如果你写一个有三个情况的 switch 语句，编译器就会使用一个有三个叶子节点的二叉树。同样，由于从根节点到第二个情况的路径是“第二个子节点”并且然后“第一个子节点”，这种情况就变成了内嵌调用，类似buildEither(first: buildEither(second: ... )) 。下面的声明是等价的：

```
let someNumber = 19
@ArrayBuilder var builderConditional: [Int] {
    if someNumber < 12 {
        31
    } else if someNumber == 19 {
        32
    } else {
        33
    }
}

var manualConditional: [Int]
if someNumber < 12 {
    let partialResult = ArrayBuilder.buildExpression(31)
    let outerPartialResult = ArrayBuilder.buildEither(first: partialResult)
    manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
} else if someNumber == 19 {
    let partialResult = ArrayBuilder.buildExpression(32)
    let outerPartialResult = ArrayBuilder.buildEither(second: partialResult)
    manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
} else {
    let partialResult = ArrayBuilder.buildExpression(33)
    manualConditional = ArrayBuilder.buildEither(second: partialResult)
}
```

- 分枝语句可能不会生成值，比如没有else 的if 分枝，就会变成buildOptional(\_:) 调用。如果if 语句的条件满足，它的代码块就会被转换并且作为实际参数传递；否则，buildOptional(\_:) 就会用nil 作为实际参数被调用。比如说，下面的声明是等价的：

```
@ArrayBuilder var builderOptional: [Int] {
    if (someNumber % 2) == 1 { 20 }
}

var partialResult: [Int]? = nil
if (someNumber % 2) == 1 {
    partialResult = ArrayBuilder.buildExpression(20)
}
var manualOptional = ArrayBuilder.buildOptional(partialResult)
```

- 代码块或do 语句会变成buildBlock(\_:) 的方法调用。每一个代码块中的语句都会被转换，一次一个，并且它们会变成buildBlock(\_:) 的实际参数。比如说，下面的声明是等价的：

```
@ArrayBuilder var builderBlock: [Int] {
    100
    200
    300
}

var manualBlock = ArrayBuilder.buildBlock(
    ArrayBuilder.buildExpression(100),
    ArrayBuilder.buildExpression(200),
    ArrayBuilder.buildExpression(300)
)
```

- for 循环变成临时变量，一个for 循环，并且调用buildArray(\_:) 方法。新的for 循环遍历整个序列并添加每一个部分结果到那个数组。临时的数组作为实际参数传递给buildArray(\_:) 调用。比如说，下面的声明是等价的：

```
@ArrayBuilder var builderArray: [Int] {
    for i in 5...7 {
        100 + i
    }
}

var temporary: [[Int]] = []
for i in 5...7 {
    let partialResult = ArrayBuilder.buildExpression(100 + i)
    temporary.append(partialResult)
}
let manualArray = ArrayBuilder.buildArray(temporary)
```

- 如果结果建造器有buildFinalResult(\_:) 方法，最终结果会变成这个方法的调用。这个转换永远是最后执行的。

尽管转换行为以临时变量的形式描述，使用结果建造器并不会真的从你的代码中创建任何可见的新声明。

你不能在结果建造器转换的代码中使用break 、continue 、defer 、guard 或者return 语句，while 语句或者do-catch 语句。

转换过程不会该面代码中的声明，这就允许你使用临时常量或者变量来一点一点建造表达式。它也不改变throw 语句，编译时诊断语句或者是包含return 语句的闭包。

如果可用，转换会被合并。比如，表达式4 + 5 \* 6 会变成buildExpression(4 + 5 \* 6) 而不是这个函数的多次调用。同样的，内嵌分枝语句变成buildEither 方法的单一二叉树调用。

#### 自定义结果建造器特性

创建结果建造器类型会创建一个同名的自定义特性。你可以在如下地方应用这个特性：

- 在函数声明时，结果建造器会建造函数的函数体；
- 在包含 getter 的变量或者下标脚本声明时，结果建造器建造这个 getter 的函数体；
- 在函数声明的形式参数中，结果建造器会建造作为相关实际参数传入的闭包的函数体。

应用结果建造器特性并不会影响 ABI 兼容性。应用结果建造器特性到形式参数会使特性作为函数接口的一部分，这会影响源代码兼容性。

### requires\_stored\_property\_inits

给类声明应用这个特性来要求所有的存储属性都必须在声明时提供默认值。这个属性会从所有继承NSManagedObject 的类中推断出来。

### testable

用这个特性import 那些编译时开启了测试功能的模块中的声明，就像他们被声明为public 访问级别一样去访问任何标记为internal 访问级别的实体。测试还可以访问那些标记为internal 或public 访问级别的类和类成员，就像他们被声明为open 访问级别一样。

### UIApplicationMain

> 过时
> 
> 这个特性已经过时了；请使用 [main](https://www.cnswift.org/attributes#main) 特性代替。在将来 Swift 6 中，这个特性会导致报错。

给一个类用这个特性，以指出它是应用的委托。用这个特性等同于用调用UIApplicationMain 函数并把这个类名作为委托类的名字传进函数中。

如果你不用这个特性，需要提供一个main.swift 文件，在其代码的最上层调用UIApplicationMain(\_:\_:\_:) 函数。例如，如果你的app用了一个UIApplication 的自定义子类作为它的主要类，调用UIApplicationMain(\_:\_:\_:)  函数，而不是使用这个特性。

### unchecked

在协议类型声明的采纳协议列表中应用这个特性来关闭协议的强制需求。

唯一支持它的协议是[`Sendable`](https://developer.apple.com/documentation/swift/sendable)。

### usableFromInline

给函数、方法、计算属性、下标脚本、初始化器或者反初始化器声明添加这个属性来允许符号用于定义在同一个模块作为声明的行内代码里。声明必须拥有internal 访问级别修饰符。

类似public 访问级别修饰符，这个特性暴露声明作为模块的公开接口。与public 不同的是，编译器不能在模块外的代码中引用usableFromInline 标记的声明，尽管声明的符号已经暴露出来。总之，模块外的代码依旧能通过运行时行为与声明的符号进行沟通。

用inlinable 标记的声明会隐式地在行内代码可用。尽管不论是inlinable 还是usableFromInline 都能应用于internal 声明，但你同时应用这两个特性是错误的。

### warn\_unqualified\_access

给顶级函数、实例方法或者类和静态方法应用这个特性来在函数或者方法不带前置修饰使用时触发警告，比如模块名、类型名或者实例变量和常量。使用这个特性来降低同一生效范围内相同函数名造成的歧义。

比如说，Swift 标准库包含了顶级函数[min(\_:\_:)](https://developer.apple.com/documentation/swift/1538339-min/)和包含可比元素的序列的方法[min()](https://developer.apple.com/documentation/swift/sequence/1641174-min)。序列方法使用warn\_unqualified\_access 特性声明以便于在Sequence 扩展中避免同时使用两者出现困惑。

### 通过 Interface Builder 使用声明特性

Interface Builder 特性是用于 Interface Builder 和 Xcode 同步的声明特性。Swift 提供了下列 Interface Builde r特性：IBAction ，IBOutlet ，IBDesignable ,和IBInspectable 。这些特性概念上和 Objective-C 中的相同。

你可以把IBOutlet 和IBInspectable 特性应用于一个类的属性声明中。把IBAction 特性用于一个类的方法声明，把IBDesignable 特性用于类的声明。

IBAction 和IBOutlet 特性都隐含objc 特性。

## 类型特性

类型特性只能用于类型中。

### autoclosure

这个特性用于，通过自动包装没有实际参数的表达式来延迟对表达式的求值。这个特性用于一个方法或函数声明的形式参数类型中，该形式参数是一个函数类型，这个函数类型不接受实际参数并且返回一个表达式的类型的值。有关如何使用autoclosure 特性的示例，参见[自动闭包](https://www.cnswift.org/closures#spl-11)和[函数类型](https://www.cnswift.org/types#spl-4)。

### convention

把这个特性应用于一个函数的类型以指明它的调用约定。

convention 特性总是和下列特性实际参数中的一个同时出现：

- swift 实际参数用于指明一个 Swift 函数引用。在 Swift 中，这是函数值的标准调用约定。
- block 实际参数用于指明一个 Objective-C 兼容的闭包引用。函数值表示为对闭包对象的一个引用，它是一个兼容id 的、在其中嵌入它的调用函数的 Objective-C 对象。调用函数用 C 调用约定。
- c 实际参数用于指明一个 C 函数引用。函数值不携带上下文并且使用 C 调用确定

除了少数例外，当需要任何其他调用约定的函数时，可以使用任何调用约定的函数。非泛型全局函数，和局部函数或不捕获任何局部变量的闭包，可以转换为 C 调用约定。其他 Swift 函数不能转换为 C 调用约定。一个带有 Objective-C 闭包调用约束的函数不能转换为 C 调用约定

### escaping

将这个特性应用到一个方法或函数声明的形式参数类型中，以指明可以存储该形式参数值用于稍后执行。这意味着允许那个值超过调用它的范围而存在。escaping 类型特性的函数类型形式参数需要为属性或方法显式使用self. 。有关如何使用explicit 特性，参见[逃逸闭包](https://www.cnswift.org/closures#spl-10)。

### Sendable

将这个特性应用到函数的类型上来指明函数或者闭包是可发送的。将这个特性应用给函数类型与遵循非函数类型到 [Sendable](https://developer.apple.com/documentation/swift/sendable)  协议功能相同。

这个特性会对函数和闭包自动推断，如果函数或者闭包在期望获得可发送值的上下文中使用，并且函数或者闭包满足可发送的需求。

可发送函数类型是其相关的不可发送函数类型的子类。

## Switch 情况特性

你只能给 switch case 添加 switch 情况特性。

### unknown

给 switch 的 case 应用这个特性来表示在代码编译后这个情况不应被枚举中已知的任何情况匹配。如何使用unknown 属性，见在未来枚举情况中使用 switch。

 

> 特性的语法
> 
> _attribute → @ attribute-name attribute-argument-clauseopt_
> 
> _attribute-name → identifier_
> 
> _attribute-argument-clause →_ **`(`**_balanced-tokensopt_**`)`**
> 
> _attributes → attribute­attributesopt_
> 
> _balanced-tokens → balanced-token ­balanced-tokens­opt_
> 
> _balanced-token → **@**_ **`(`**`­`_balanced-tokens­opt­_**`)`**
> 
> _balanced-token_ _→_ **`[­`**_balanced-tokens­opt­_**`]­`**
> 
> _balanced-token_ _→_ **`{­`**_balanced-tokens­opt_­**`}`**
> 
> _balanced-token_ → **Any identifier, keyword, literal, or operator**
> 
> _balanced-token_ _→_ **Any punctuation except `(­`, `)­`, `[­`, `]­`, `{­`, or** `**}**­`
