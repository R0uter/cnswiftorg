---
title: "App Store 里的 Swift 2 App"
date: 2015-09-22
categories: 
  - "swift-blog"
---

Swift 2 已经准备好面世了。你现在可以提交带有 Swift 2 最新特性的 app 。它让你的代码更加可读和给力，包括guard ，新的错误控制模块以及可用性控制。

确保使用 [Xcode7](https://developer.apple.com/xcode/download/) 来编译你的应用并且使用 [OS X El Capitan](https://developer.apple.com/osx/download/) 的 GM 版本，以及最终版本的 [iOS9](https://developer.apple.com/ios/download/) 和 [watchOS2](https://developer.apple.com/watchos/download/) 。

### Xcode 7 和 OS X El Capitan

OS X El Capitan 需要 Xcode 7 ，它包括了 Swift 2 ，天生支持系统完整性保护（SIP），app thinning，以及最新的SDK，当运行 Xcode7 时，你可能会被提示一些需要应用在 Swift 1.2 代码上的语法改变。为了帮你迁移到 Swift2，Xcode7 包括了一个非常有用的工具来帮你重写旧版本的 Swift 代码。只需要选择菜单里的 Edit > Convert > To Latest Swift Syntax 然后 Xcode 就会迁移你的代码到最新的 Swift API 和语法。

如果你的代码在开发的后期阶段，你需要在 Xcode6在多停留一段时间，你得继续使用 OS X Yosemite 作为你的开发系统。OS X El Capitan 和 Xcode 6 的组合不能向 App Store 提交应用，因为基础体系结构进行了重大改变。如果你需要在另一个分区或者外接硬盘安装 OS X Yosemite，你可以从 App Store下载 OS X Yosemite，然后安装[这些步骤](https://support.apple.com/en-us/HT201372)来安装。同时注意 Xcode7 在 OS X El Capitan 和 Yosemite 上都是被支持的。
