---
title: "版本兼容性"
date: 2017-06-08
sidebar_position: 2
---

这本书讲述的是 Swift 5.1，它是 Xcode 11 中包含的默认版本。你可以使用 Xcode 11 来编译用 Swift 5.1、Swift 4.2 或 Swift 4 写的代码。

当你使用 Xcode 11 编译 Swift 4 和 Swift 4.2 代码时，大部分 Swift 5.1 的功能是可用的。也就是说，下面的变更仅对 Swift 5.1 或后续版本生效：

- 返回不透明类型的函数需要 Swift 5.1 运行时；
- try? 表达式并不会为已经返回的可选项引入额外的可选性层级；
- 巨大的整数字面量初始化表达式会被推断为正确的整数类型。比如说，UInt64(0xffff\_ffff\_ffff\_ffff) 会被处理成正确的值而不是溢出。

用 Swift 5.1 编写的目标可以依赖用 Swift 4.2 或 Swift 4 编写的目标，反之亦然。也就是说，如果你有一个巨大的分成好多个 framework 的项目，你可以每次只把一个 framework 从 Swift 4 迁移到 Swift 5.1.
