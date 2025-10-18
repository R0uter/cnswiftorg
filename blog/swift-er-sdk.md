---
title: "Swift 开发者的 SDK"
date: 2015-08-14
categories: 
  - "swift-blog"
---

在 Xcode 6.3 中，我们曾为 Objective-C 添加了新的 [空值标记](https://developer.apple.com/swift/blog/?id=25) 语言特性。这个特点给了 Objective-C 语言一个与 Swift 相同的表达空与非空种类的 API 接口。Xcode 7 通过给 Objective-C 引入轻量泛型模块让 Objective-C 与 Swift 沟通更加自然。泛型允许两个语言安全的沟通和分享保存了特定种类元素的合集。 这些特性对任何写 同时包含 Swift 和 Objective-C 代码的 APP 的人来说都很有用。但是这里还有一些 Objective-C 开发者每天都在使用的更大的合集代码：组成苹果 SDK 的那些框架。为了提高 Swift _和_ Objective-C 的操作体验，我们倾全公司的努力来在我们的 SDK 头提供这个信息。在 Xcode 7你将会发现几乎所有的常见框架现在都在它们的 API 和合集类型的元素上支持了可空属性。这使得我们的 Swift 接口从这样：

```
class UIView : UIResponder {  
	init!(frame: CGRect)

	var superview: UIView! { get }  
	var subviews: [AnyObject]! { get }  
	var window: UIWindow! { get }

	// ...

	func isDescendantOfView(view: UIView!) -> Bool
	func viewWithTag(tag: Int) -> UIView!

	// ...

	var constraints: [AnyObject]! { get }

	// ...
}
```

  变成这样:

```
class UIView : UIResponder {  
	init(frame: CGRect)

	var superview: UIView? { get }  
	var subviews: [UIView] { get }  
	var window: UIWindow? { get }

	// ...

	func isDescendantOfView(view: UIView) -> Bool  
	func viewWithTag(tag: Int) -> UIView?

	// ...

	var constraints: [NSLayoutConstraint] { get }

	// ...
}
```

最后一个问题是 Xcode 7 转换你代码到 Swift 2 的工具。这个工具存在于 Xcode 的 Edit 菜单， Convert > To Latest Swift Syntax 。这个工具能把使用 Swift 1.2 编写的项目转换到合适的 Swift 2 版本，还会修改一些必要的配置。这些更改体现在升级的头部信息上。举个栗子，重写一个方法的时候它的参数和返回类型现在更加清晰易读，迁移器会更新你的方法来匹配之。 对于 Objective-C 的改善在 WWDC 的 [Swift 和 Objective-C 的交互性](https://developer.apple.com/videos/wwdc/2015/?id=401) 14分30秒处开始。不过这个视频使用 Xcode 6.3 _**\_\_**_`nullable` 语法与 Xcode 7 中更新了的 _**\_**_`Nullable` 语法不同。更多关于可空标注的信息，参见博文 [空属性和 Objective-C](https://developer.apple.com/swift/blog/?id=25)  。对于 Swift 2 和 Objective-C 的轻量泛型，移步 [Xcode 7 发布注释](https://developer.apple.com/go/?id=xcode7-beta-release-notes) 来了解更多。

* * *

本文由落格博主作为学习之用个人翻译，版权归苹果官方博客所有，侵删。 如果要转载，请著明本页面的链接！
