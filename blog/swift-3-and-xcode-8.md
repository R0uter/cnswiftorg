---
title: "Swift 3 和 Xcode 8"
date: 2016-06-22
categories: 
  - "swift-blog"
---

Swift 3 beta 作为 Xcode 8 beta 的一部分来发布并且包含了大量的强化，很多贡献都来自开源社区。Swift 3 的主要目的是实现最新的主要源变动来使 Swift 始终保持语言的协调一致，为将来的版本发布提供更稳定的语法。

Swift 3 里保留的 Swift 语法和 API 让语言更感自然，并且在调用 Cocoa 框架时提供了更加 Swift-y\[1\] 的体验。流行的框架 Core Graphics 和 Grand Central Dispatch 现在在 Swift 中有了一个全新、更加清晰的接口。这次发布同时提升了编译性能，还包含了很多小的使它更加有趣的小改动。

[Xcode 8 beta](http://developer.apple.com/download/) 包含了一个 Swift 文档和 Playground 的迁移助手来帮助你把你的现有代码迁移到 Swift 3 。

## Swift 2.3

另外对于 Swift 3 来说，Xcode 8 支持使用 Swift 2.3 进行开发，一个对 Swift 2.2 语言的小升级，用来操作 macOS Sierra、iOS 10、tvOS以及 watchOS 3 的新 SDK。这样做的目的是为了允许开发者立即迁移到最新的 SDK，甚至是那些已经快用 Swift 2.2 开发完成并且还没有准备迁移到 Swift 3 的项目。Xcode 8 可以迁移你的代码到新的 Swift 2.3，它主要是把更加清晰的可空性添加到了新的 SDK 里了。比如说：

没有使用新 SDK 可空性定义的 Swift 2.2 Core Image 代码：

```
let image = CIImage(MTLTexture: texture, options: options)
```

Swift 2.3 让可失败初始化器更加清晰：

```
if let image = CIImage(MTLTexture: texture, options: options)
```

或者：

```
let image = CIImage(MTLTexture: texture, options: options)!
```

Swift 3 是 Xcode 8 支持的主要开发语言所以如果你选择继续使用 Swift 2.3 进行开发的话，这里有几点需要注意。首先，Swift 2.3 和 Swift 3 并非二进制兼容所以你 app 的整个代码基础需要选择一个 Swift 版本。两个版本都可以被编译器、SDK以及调试器完全支持，但 IDE 的其他特性可能不会兼容 Swift 2.3。举例来说，Xcode 的 Playground 就只支持 Swift 3，并且注意 Swift Playground 的 iPad app 也使用 Swift 3。Xcode 项目模板都使用 Swift 3，所有的文档都是使用 Swift 3 格式展示的。

当 Xcode 8 在今年年末发布 GM 版本的时候，你将可以把无论 Swift 3.0 还是 2.3 写的 app 提交到 App Store。Swift 3 的改动体现了未来 Swift 的发展走向，我们强烈建议你预算一下时间来迁移你的 Swift 代码到版本 3 。就算是你第一次迁移到 Swift 2.3，你也可以稍后运行 Xcode 8 迁移助手来迁移 Swift 2.3 到 Swift 3 。

* * *

译注：

\[1\] Swift-y ：“swift” 在英文中作为形容词意思为“迅速的”，“swifty”则不存在，所以写成了 swift + y，实际意思是说“强调更加的迅速”。
