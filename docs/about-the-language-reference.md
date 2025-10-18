---
title: "关于语言参考"
date: 2015-08-14
sidebar_position: 51
---

书中的这部分内容描述了 Swift 编程语言的正式语法。这里描述的语法意在帮助你了解语言的更多细节，而不是允许你直接实现解析器或者编译器。

Swift 语言相对较小，因为看上去出现在 Swift 代码中各种地方的常见类型、函数和运算符实际上是在 Swift 标准库中定义的。尽管这些类型、函数和运算符不是 Swift 语言自身的一部分，但它们还是在书中这部分的讨论当中大量使用了。

## 如何阅读语法

用来描述 Swift 编程语言标准语法的标记遵循以下几点约定：

- 箭头（→）用来标记语法产生并且可以读作“可以由什么组成。”
- 语法分类用斜体文本显示并且出现在语法产生规则的两边。
- 标记语言和标点符号用粗体等宽文本显示且只会出现在语法产生规则的右手侧。
- 可替代语法产生式用竖线（|）分割。当可替代产生式太长而不方便阅读时，它们会在新行中被分拆成多个语法产生规则。
- 少数情况下，标准字体文本被用来描述一个语法产生规则的右手侧内容。
- 可选语法分类和文本标记使用尾随的下标，_opt_。

来个栗子，getter-setter 代码块的语法如下定义：

> getter-setter 代码块语法
> 
> getter-setter-block → `{­`[getter-clause](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause) ­[setter-clause](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause)­opt­`}­`  `{­`[setter-clause](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause)­ [getter-clause](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause)­`}­`

这个定义明确了 getter-setter 代码块可以由 getter 分句组成，后跟一个可选的 setter 分句，用花括号括起来。或者 setter 分句后跟一个 getter 分句。上文中的语法产生式与接下来的两个产生式等价，不过下边的更加明确：

> getter-setter 代码块语法
> 
> getter-setter-block → `{­`[getter-clause](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause) ­[setter-clause](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause)­opt­`}­`
> 
> getter-setter-block → `{­`[setter-clause](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause) ­[getter-clause](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause)­`}­`
