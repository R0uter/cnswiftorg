---
title: "在 iPad 上用 Swift Playgrounds  给机器人编程"
date: 2016-09-25
categories: 
  - "swift-blog"
---

在 WWDC 2016 我们发布了 Swift Playgrounds ，一个全新的使用 Swift 教学核心编程思想的 iPad 应用。除了苹果应用程序提供的牛逼功能之外，我们很高兴能看到 Swift 开发者社区将来会创建和分享的东西。我们在 WWDC 中呈现了一个名为[介绍 Swift Playgrounds](https://developer.apple.com/videos/play/wwdc2016/408/) 的深入讨论环节，它向你展示了如何为 iPad 创建你自己的.playgroundbook 文件，它拥有多页面、实时视图以及华丽的过场动画。

在这个 WWDC 环节中我们还在舞台上展示了在 iPad 上用 Swift Playgrounds 驱动控制一个 Sphero SPRK+ 机器人。由于 Swift Playgrounds 中的代码可以访问 iOS SDK，包括 CoreBluetooth 框架，你可以写一个能完全控制设备的程序比如说控制这些机器人。我们已经更新了在 WWDC 上展示的 playground，你可以看到它的原理，甚至是进一步扩展它的功能来教会你机器人更多小把戏。这个 playground 在文末可下载，你可以通过 iCloud、AirDrop以及邮件等方法把它传送到运行 Swift Playgrounds 的 iPad 上。

当你在 playground 的第一页运行代码时你会看到一个触摸界面来在室内手动驱动 Sphero 机器人。注意，它跑的很快！点击 playground 顶部的 Next Page 字样来移动到后续页面。这里你能访问一个简单的 API 来使用代码控制机器人，让你能够简单地写一个简短的程序来在移动机器人走方形、八字形等其他你喜欢的设计。

要运行这个 playground，你需要带有 64 位 CPU 的 iPad 并安装 Swift Playgrounds app 以及 iOS 10。你还需要一个支持蓝牙 LE 的 Sphero 机器人，比如说 [BB-8](http://www.sphero.com/starwars) ，或者新的[SPRK+](http://www.sphero.com/sprk-plus)。一旦机器人在附近，这个 playground 就会发现并允许你使用 Swift Playgrounds 来控制它。

你可以[从 App Store下载 Swift Playgrounds](http://appstore.com/swiftplaygrounds)。

- [Sphero.playgroundbook](https://developer.apple.com/swift/blog/downloads/Sphero.playgroundbook.zip)
