---
title: "文档修订历史"
date: 2015-08-14
sidebar_position: 101
---

本页面记录了 **Swift 编程语言** 的版本修订历史：

### 2024年3月5日

- 为 Swift 5.10 进行了更新；
- 在委托章节添加了关于内嵌协议的信息；
- 在 [NSApplicationMain](https://www.cnswift.org/attributes#nsapplicationmain "NSApplicationMain") 和 [UIApplicationMain](https://www.cnswift.org/attributes#uiapplicationmain "UIApplicationMain") 小节添加了过时标记。

### 2023年12月11日

- 为 Swift 5.9.2 进行了更新；
- 在参数修饰符小节新增关于 borrowing  和 consuming  修饰符的信息；
- 在[声明变量和常量](https://www.cnswift.org/the-basics#%e5%a3%b0%e6%98%8e%e5%b8%b8%e9%87%8f%e5%92%8c%e5%8f%98%e9%87%8f)小节新增声明后为常量赋值的信息；
- 在[并发](https://www.cnswift.org/concurrency)章节新增一些关于任务，任务组和任务取消的信息；
- 在宏章节新增关于实现在现有 Swift 包实现宏的信息；
- 更新 [attached](https://www.cnswift.org/attributes#attached) 小节，现在扩展宏替换了遵循宏；
- 添加了[反向部署](https://www.cnswift.org/attributes#backdeployed)小节，包含更多关于反向部署的信息。

### 2023年9月18日

- 为 Swift 5.9 进行了更新；
- 在“[控制流](https://www.cnswift.org/control-flow)”章节以及“[条件表达式](https://www.cnswift.org/expressions)”部分，增加了关于 if  和 switch  表达式的信息；
- 增加了“[宏](https://www.cnswift.org/macros)”章节，附有有关编译时生成代码的信息；
-  扩充了[基础内容](https://www.cnswift.org/the-basics)中关于可选项的讨论；
- 在 [Swift 概览](https://www.cnswift.org/a-swift-tour)中添加了一个并发的例子；
- 在“[不透明类型和包装类型](https://www.cnswift.org/opaquetypes)”章节中，增加了关于包装协议类型的信息；
- 在“[构造结果方法](https://www.cnswift.org/attributes)”部分，更新了关于 buildPartialBlock(first:)  和 buildPartialBlock(accumulated:next:)  方法的信息；
- 添加 visionOS 到 [available](https://www.cnswift.org/attributes#available) 和 可选编译代码块的平台列表中；
- 格式化正式语法，使用空行进行分组。

### 2023年6月5日

- 为 Swift 5.9 进行了更新；
- 在“[控制流](https://www.cnswift.org/control-flow)”章节以及“[条件表达式](https://www.cnswift.org/expressions)”部分，增加了关于 if  和 switch  表达式的信息；
- 增加了“[宏](https://www.cnswift.org/macros)”章节，附有有关编译时生成代码的信息；
- 在“[不透明类型和包装类型](https://www.cnswift.org/opaquetypes)”章节中，增加了关于包装协议类型的信息；
- 在“[构造结果方法](https://www.cnswift.org/attributes)”部分，更新了关于 buildPartialBlock(first:)  和 buildPartialBlock(accumulated:next:)  方法的信息。

### 2023年3月30日

- 为 Swift 5.8 进行了更新；
- 接入 Swift-DocC 以便发布；
- 其他小修小补。

> 译注：由于苹果官方文档并未提供任何有用的更新日志，我们无法做出任何具体的同步更新……所以什么都没做就是了……🤷‍♂️

### 2022年09月12日

- 为 Swift 5.7 进行了更新；
- 添加了[可发送类型](https://www.cnswift.org/concurrency#spl-8)小节，包括一些在行为体和任务之间传送数据的信息，还有一些关于[@Sendable](https://www.cnswift.org/attributes#Sendable)  和[@unchecked](https://www.cnswift.org/attributes#unchecked) 标签的信息到对应小节；
- 添加了一些关于创建正则表达式的信息到[正则表达式字面量](https://www.cnswift.org/lexical-structure#spl-8)小节；
- 添加了一些if-let 简写信息到[可选绑定](https://www.cnswift.org/the-basics#spl-20)小节；
- 添加了一些关于#unavailable 的向别处到[检查API可用性](https://www.cnswift.org/control-flow#API)小节。

### 2022年03月14日

- 为 Swift 5.6 进行了更新；
- 更新了[显式成员表达式](https://www.cnswift.org/expressions#spl-19)小节关于使用#if 包裹链式方法调用以及其他后缀表达式的信息；
- 更新了全局插图的视觉风格（译注：这个就不更新了，只是变了风格，内容不变）。

### 2021年09月20日

- 为 Swift 5.5 进行了更新；
- 添加关于异步函数、任务和行为体信息到[并发](https://www.cnswift.org/concurrency)章节、行为体声明、异步函数和方法以及[Await 运算符](https://www.cnswift.org/expressions#Await)小节；
- 更新了[标识符](https://www.cnswift.org/lexical-structure#spl-2)小节，添加关于下划线开头的标识符的信息。

### 2021年4月26日

- 为 Swift 5.4 进行了更新；
- 添加了带有结果建造器信息的[结果建造器](https://www.cnswift.org/advanced-operators#spl-18)和[resultBuilder](https://www.cnswift.org/attributes#resultBuilder)小节；
- 添加了[隐式转换为指针类型](https://www.cnswift.org/expressions#spl-17)章节，带有更多关于输入输出形式参数如何在函数调用中被隐式转换为不安全指针的说明；
- 更新了[可变形式参数](https://www.cnswift.org/functions#spl-13)和函数声明章节，现在函数可以有多个可变形式参数；
- 更新了[隐式成员表达式](https://www.cnswift.org/expressions#spl-11)章节，现在隐式成员表达式可以链式调用。

### 2020年9月16日

- 为 Swift 5.3 进行了更新；
- 在[尾随闭包](https://www.cnswift.org/closures#spl-7)小节添加了关于多个尾随闭包的信息；
- 增加了关于枚举Comparable 综合实现的信息到[使用综合实现采纳协议](https://www.cnswift.org/protocols#spl-13)小节；
- 增加了[上下文Where分句](https://www.cnswift.org/generics#_Where-2)小节，现在你可以在更多地方写范型where 分句了；
- 添加了关于使用无主引用与可选项的信息到[无主可选引用](https://www.cnswift.org/automatic-reference-counting#spl-5)小节；
- 添加了关于@main 特性的相关信息到[main](https://www.cnswift.org/attributes#main)小节；
- 添加#filePath 到[字面量表达式](https://www.cnswift.org/expressions#spl-7)小节，并更新了关于#file 的讨论；
- 更新了[逃逸闭包](https://www.cnswift.org/closures#spl-10)小节，现在闭包可在更多情况下隐式引用self ；
- 更新了[2.2 使用 Do-Catch 处理错误](https://www.cnswift.org/error-handling#_Do-Catch)和 Do语句 小节，现在catch 分句可以匹配多个错误；
- 添加了更多关于Any 的信息并新增[Any 类型](https://www.cnswift.org/types#Any)小节；
- 更新了[属性观察者](https://www.cnswift.org/properties#spl-7)小节，现在懒加载属性也能拥有观察者；
- 更新了协议声明小节，现在枚举的成员可以满足协议需求；
- 更新了存储变量观察者和属性观察者小节来描述何时 getter 在观察者前调用；
- 更新[内存安全性](https://www.cnswift.org/memory-safety)章节以提到原子操作。

### 2020年3月24日

- 为 Swift 5.2 进行了更新；
- 添加了关于传入 key path 而不是闭包的相关信息到 [Key-Path 表达式](https://www.cnswift.org/expressions#Key-Path) 小节；
- 添加了带有特殊名称的方法小节，说明了关于使用 let 声明类、结构体和枚举实例的语法糖可用于函数调用的语法；
- 更新了 [下标选项](https://www.cnswift.org/subscripts#spl-3) 小节，现在下标支持带有默认值的形式参数了；
- 更新了 [Self 类型](https://www.cnswift.org/types#Self)小节，现在Self 可以在更多上下文中使用了；
- 更新了[隐式展开可选项](https://www.cnswift.org/the-basics#spl-21)小节以说明隐式展开可选项值既可以当作可选项也可以当作不可选值。

### 2019年09月10日

- 为 Swift 5.1 进行了更新；
- 添加了关于函数指定一个返回值遵循协议，而不是提供特定返回类型的信息到[不透明类型](https://www.cnswift.org/opaquetypes)章节；
- 为[属性包装](https://www.cnswift.org/properties#spl-8)小节添加了关于属性包装的信息；
- 添加了关于枚举和switch的信息，结构体可在库演进模式被冻结到 [frozen](https://www.cnswift.org/attributes#frozen) 章节；
- 添加了关于省略函数return 的相关信息到[隐式返回的函数](https://www.cnswift.org/functions#spl-8)和[缩写 getter 声明](https://www.cnswift.org/properties#getter)小节；
- 添加了关于对类型使用下标的信息到[类型下标](https://www.cnswift.org/subscripts#spl-4)小节；
- 更新了枚举情况模式小节，现在枚举情况模式可以匹配可选项；
- 更新了[结构体的成员初始化器](https://www.cnswift.org/initialization#spl-11)小节，现在成员初始化器支持省略带有默认值的属性了；
- 在[dynamicMemberLookup](#dynamicMemberLookup-2)小节添加了关于动态成员可在运行时通过 key path 查找的信息；
- 在可选编译代码块中添加了macCatalyst 到目标环境列表；
- 更新了 [Self 类型](https://www.cnswift.org/types#Self)章节，现在Self 可以用来引用当前类、结构体或者枚举声明引入的类型。

### 2019年03月25日

- 为 Swift 5.0 进行了更新；
- 添加了[扩展字符分隔符](https://www.cnswift.org/strings-and-characters#spl-4)小节并更新了[字符串字面量](https://www.cnswift.org/strings-and-characters#spl)小节中关于扩展字符串分隔符的内容；
- 添加了包含关于使用dynamicCallable 特性来动态调用实例作为函数信息的 [dynamicCallable](https://www.cnswift.org/attributes#dynamicCallable) 章节；
- 添加了包含关于在switch语句中使用unknown 特性处理未来枚举情况信息的 [unknown](https://www.cnswift.org/attributes#unknown) 和 在未来枚举情况中 switch 章节；
- 在 [Key-Path 表达式](#Key-Path)章节添加了关于身份 key path （\\.self ）的相关信息；
- 在条件编译代码块章节添加了关于在平台条件中使用小于（< ）运算符的信息。

### 2018年9月17日

- 为 Swift 4.2 进行了更新；
- 添加了关于访问枚举所有情况来[遍历枚举情况](https://www.cnswift.org/enumerations#case)的章节；
- 添加了关于#error 和 #warning 的信息到编译时诊断语句章节；
- 添加了关于行内的信息到[声明特性](https://www.cnswift.org/attributes)章节，分别是inlinable 和usableFromInline 特性；
- 添加了一个关于在运行时通过名称查找成员的信息到[声明特性](https://www.cnswift.org/attributes)章节，dynamicMemberLookup ；
- 在[声明特性](https://www.cnswift.org/attributes)章节添加了关于requires\_stored\_property\_inits 和warn\_unqualified\_access 特性的信息；
- 在语句章节添加了关于如何基于正在使用的 Swift 编译器版本来有条件地编译代码；
- 在字面量表达式小节添加了关于#dsohandle 的信息。

### 2018年3月29日

- 为 Swift 4.1 进行了更新；
- 为[等价运算符](https://www.cnswift.org/advanced-operators#spl-15)小节添加了关于等价运算符合成实现的信息；
- 为声明章节的扩展声明小节以及[协议](https://www.cnswift.org/protocols)章节的有条件地遵循协议小节添加了关于条件协议遵循的信息；
- 添加了关于递归协议约束的相关信息到[在关联类型约束里使用协议](https://www.cnswift.org/generics#spl-13)小节；
- 添加了一个关于canImport() 和targetEnvironment() 平台条件的相关信息到条件编译代码块。

### 2017年12月4日

- 为 Swift 4.0.3 进行了更新；
- 更新了 [Key-Path](https://www.cnswift.org/expressions#Key-Path) 表达式章节，现在 Key Path 支持下标组合了。

### 2017年09月19日

- 为 Swift 4 进行了更新；
- 添加了[关联类型的泛型 Where 分句](https://www.cnswift.org/generics#_Where-2)章节，现在你可以使用泛型where 分句来限制关联类型；
- 添加了关于独占访问内存相关信息的[内存安全性](https://www.cnswift.org/memory-safety)小节；
- 添加了关于多行字面量的信息到[字符串和字符](https://www.cnswift.org/strings-and-characters)章节的[字符串字面量](https://www.cnswift.org/strings-and-characters#spl)小节，还有[词汇结构](https://www.cnswift.org/lexical-structure)章节的[字符串字面量](https://www.cnswift.org/lexical-structure#spl-7)小节。
- 更新了关于[声明特性](https://www.cnswift.org/attributes#spl)中关于objc 特性的讨论，现在这个特性在更少的地方推断；
- 添加了[泛型下标](https://www.cnswift.org/generics#spl-13)小节，现在下标可以泛型；
- 更新了[协议](https://www.cnswift.org/protocols)章节中的[协议组合](https://www.cnswift.org/protocols#spl-15)小节中的讨论，以及[类型](https://www.cnswift.org/types)章节中的[协议组合类型](https://www.cnswift.org/types#spl-9)小节，现在协议组合类型可以包含父类需求；
- 更新了扩展声明中关于协议扩展的讨论，现在final 不能在其中使用了；
- 添加了先决条件和致命错误到[断言和先决条件](https://www.cnswift.org/the-basics#spl-23)小节。

### 2017年03月27日

- 为 Swift 3.1 进行了更新；
- 为包含需求的扩展信息添加了 [带有 Where 分句的扩展](https://www.cnswift.org/generics#_Where) 小节；
- 在 [For-in 循环](https://www.cnswift.org/control-flow#For-in)小节中添加了遍历区间的例子；
- 添加了一个可失败数字化转换栗子到[可失败初始化器](https://www.cnswift.org/initialization#spl-21)小节；
- 为 声明标注 小节添加了关于使用available 标注 Swift 语言版本的信息；
- 更新了[函数类型](https://www.cnswift.org/types#spl-4)小节的讨论来说明实际参数标签不能写在函数类型里；
- 更新了可选编译代码块中关于 Swift 语言版本号的讨论，现在可选补丁版本；
- 更新了[函数类型](https://www.cnswift.org/types#spl-4)小节中的讨论，现在 Swift 对于接收多个形式参数的函数和接收一个元组作为形式参数的函数两者之间的区别；
- 移除了[表达式](https://www.cnswift.org/expressions)一章的动态类型表达式小节，现在type(of:) 是标准库函数了。

### 2016年10月27日

- 为 Swift 3.0.1 进行了更新；
- 更新了[自动引用计数章](https://www.cnswift.org/automatic-reference-counting)节中关于弱引用和无主引用的讨论；
- 添加了关于unowned 、unowned(safe) 、 unowned(unsafe)  声明修饰符到声明修饰符章节；
- 添加了一个关于在显式声明类型为Any 时使用可选项值的注意事项到Any和AnyObject的类型转换章节；
- 更新了表达式章节来分隔括号表达式和元组表达式。

### 2016年09月13日

- 为 Swift 3.0 进行了更新；
- 更新了[函数](https://www.cnswift.org/functions)章节和函数声明小节关于函数的讨论来提醒所有的形式参数默认都有一个实际参数标签；
- 更新了[高级运算符](https://www.cnswift.org/advanced-operators)章节，现在你可以以类型方法实现它们而不是全局函数了；
- 添加了关于open 和fileprivate 权限修饰符到访问控制章节；
- 更新了函数声明章节中关于inout 的讨论以说明它出现在形式参数类型中；
- 更新了[非逃逸闭包](https://www.cnswift.org/closures#spl-10)和[自动闭包](https://www.cnswift.org/closures#spl-10)以及特性章节中的@noescape 和@autoclosure 相关讨论，现在他们是类型标志了，而不是声明标志；
- 在[高级运算符](https://www.cnswift.org/advanced-operators)章节的[自定义中缀运算符的优先级](https://www.cnswift.org/advanced-operators#spl-17)小节以及声明章节的优先级组声明小节中添加了关于运算符优先级组的信息；
- 更新了全局使用 macOS 而不是 OS X，Error 而不是ErrorProtocol ，以及协议名字比如ExpressibleByStringLiteral 而不是StringLiteralConvertible ；
- 更新了泛型章节的泛型 Where 分句以及泛型形式参数和实际参数章节，现在泛型where 分句作为声明的末尾来写；
- 更新了[逃逸闭包](https://www.cnswift.org/closures#spl-10)小节，现在闭包默认为非逃逸了；
- 更新了[基础内容](https://www.cnswift.org/the-basics)章节以及语句章节的可选绑定小节和 While 语句小节，现在if ，while 和guard 语句不使用where 而是使用逗号分隔条件列表；
- 添加了关于switch 的情况能够包含多个模式的信息到[控制流](https://www.cnswift.org/control-flow)章节的[Switch](https://www.cnswift.org/control-flow#Switch)小节，以及语句章节的Switch语句小节；
- 更新[函数类型](https://www.cnswift.org/types#spl-4)小节关于函数类型的讨论，现在函数实际参数标签不再是函数类型的一部分；
- 更新了[协议](https://www.cnswift.org/protocols)章节的[协议组合](https://www.cnswift.org/protocols#spl-15)小节的协议组合类型，以及类型章节的协议组合类型小节来使用新的Protocol1 & Protocol2 语法；
- 更新动态类型表达式小节的讨论以使用新的type(of:) 语法；
- 在行控制语句小节更新了控制语句的讨论来使用 #sourceLocation(file:line:)  语法；
- 更新了永不返回的函数中的讨论来使用新的Never 类型；
- 添加了关于 Playground 字面量的信息到字面量表达式小节；
- 更新了输入输出形式参数小节来说明只有非逃逸闭包才能捕获输入输出形式参数；
- 更新了[默认形式参数值](https://www.cnswift.org/functions#spl-11)小节中关于默认形式参数的讨论，现在它们不能在函数的调用中改变顺序了；
- 更新了标志章节来让实际参数使用分号；
- 添加了关于在catch 代码块中再次抛出错误的功能到函数和方法的再次抛出小节；
- 添加了关于访问 Objective-C 属性的getter 或者setter 的selector 的信息到Selector 选择器；
- 在类型别名声明小节中添加了关于泛型类型别名以及在协议中使用类型别名的信息；
- 更新了函数类型小节中关于函数类型的讨论来说明需要圆括号包围形式参数类型；
- 更新了[特性](https://www.cnswift.org/attributes)章节来说明@IBAction ，@IBOutlet 以及@NSManaged 特性隐含@objc 特性；
- 添加了@GKInspectable 特性到声明特性小节；
- 更新了可选协议需求小节中关于可选协议需求的讨论以说明它们仅仅在与 Objective-C 交互的时候才会用到；
- 移除了函数声明章节中关于在函数形式参数中显式使用let 的讨论；
- 移除了语句章节中关于Boolean 协议的讨论，现在这个协议已经从 Swift 标准库中移除了；
- 更正了声明[特性](https://www.cnswift.org/attributes)中@NSApplicationMain 特性的讨论。

### 2016年03月21日

- 为 Swift 2.2 进行了更新；
- 添加了关于如何基于正在使用的 Swift 版本分情况编译代码的信息到编译配置语句小节；
- 添加了关于如何区分仅实际参数名称不同的初始化器和方法的信息到显式成员表达式章节；
- 添加了关于 Object-C 中#selector 语法的信息到 Selector 表达式小节；
- 更新了关联类型和协议关联类型声明小节中关联类型的讨论以使用associatedtype ；
- 添加了关于在实例完全初始化前返回nil 的初始化器信息到[可失败的初始化器](/initialization/#spl-21)小节；
- 添加了关于对比元组的信息到[比较运算符](/basic-operators#spl-9)小节；
- 添加了关于把关键字作为外部形式参数名的信息到关键字和标点符号小节；
- 更新了声明[标志](https://www.cnswift.org/attributes)小节中对于@objc 的讨论以注明枚举和枚举情况能使用这个标志；
- 更新了运算符小节对包含点的自定义运算符的讨论；
- 给重抛出方法和函数小节添加了一个注记，重抛出函数不能直接抛出错误；
- 添加了一个注记到[属性观察者](/properties#spl-7)小节，属性观察者会在你以输入输出形式参数传入参数时调用；
- 添加了关于错误处理小节到 [Swift 概览](/a-swift-tour/)章节；
- 更新了[弱引用](/automatic-reference-counting#spl-3)小节的图示以更清晰地显示释放过程；
- 移除了对 C 风格的for 循环，++ 缀和后缀运算符以及\-- 前缀和后缀运算符的讨论；
- 移除了对于可变函数实际参数以及对递归函数的特殊语法的讨论。

### 2015年10月20日

- 为Swift 2.1 做了更新。
- 添加了[非逃逸闭包](http://www.cnswift.org/closures/#spl-10)小节，关于@noescape 标注的一些信息。
- 更新了[字符串插值](http://www.cnswift.org/strings-and-characters/#spl-7)和字符串字面量小节，现在字符串插值可以包含字符串字面量。
- 更新了声明标注和构建配置语句小节关于tvOS的信息。
- 添加了关于输入输出形式参数的信息到输入输出形式参数小节。
- 添加了信息到捕获列表小节，关于值是如何在闭包捕获列表被确定和捕获的。
- 更新了通过可选链访问属性小节来明确通过可选链赋值的行为。
- 在[自动闭包](http://www.cnswift.org/closures/#spl-10)小节引入了自动闭包的讨论。
- 添加了使用?? 运算符的栗子到 [Swift 概览](http://www.cnswift.org/a-swift-tour/) 章节。

### 2015年9月16日

- 为 Swift 2.0 进行了更新。
- 添加了关于错误处理的信息到[错误处理](/error-handling/)一章，[Do语句](http://www.cnswift.org/error-handling/#_Do-Catch)一节，[Throw语句](http://www.cnswift.org/error-handling/#_Do-Catch)一节，[Defer语句](http://www.cnswift.org/error-handling/#spl-6)一节以及[Try运算符](http://www.cnswift.org/error-handling/#_Do-Catch)一节。
- 添加了关于 API 可用性检查的信息到[控制流](/control-flow/)一章的[检查 API 可用性](http://www.cnswift.org/control-flow/#API)一节，以及[语句](/statements/)章节的可用性条件小节。
- 添加了关于guard 语句的信息到[控制流](/control-flow/)一章的[提前退出](/control-flow/#spl-8)小节以及[语句](/statements/)章节的Guard语句小节。
- 添加了关于协议扩展的信息到[协议](/protocols/)一章的[协议扩展](https://www.cnswift.org/protocols#spl-18)小节。
- 添加了关于单元测试的访问控制信息到[访问控制](/access-control/)一章的单元测试目标的访问等级小节。
- 添加了关于新可选模式的信息到[模式](/patterns/)一章的可选模式小节。
- 更新了 [Repeat-While](http://www.cnswift.org/control-flow/#Repeat-While) 小节，关于Repeat-While 循环。
- 更新了声明标注小节，关于@available 和@warn\_unused\_result 标注。
- 更新了[字符串和字符](/strings-and-characters/)章节，现在String 不在遵循 Swift 标准库的CollectionType 协议。
- 添加了关于新 Swift 标准库print(\_:separator:terminator) 函数的信息到打印常量和变量小节。
- 添加了关于递归枚举的信息到[枚举](/enumerations/)一章的[递归枚举](http://www.cnswift.org/enumerations/#spl-7)章节，以及[声明](/declarations/)一章的任意类型情况的枚举章节。
- 添加了关于@autoclosure 标志的信息——包括它的@autoclosure(escaping) 形式——到[自动闭包](http://www.cnswift.org/closures/#spl-10)小节。
- 更新了声明特性小节关于@available 和@warn\_unused\_result 标注的信息。
- 更新了类型标注小节，关于@convention 标注。
- 添加了一个使用where 分句进行多可选项绑定的栗子到[可选项绑定](http://www.cnswift.org/the-basics/#spl-20)小节。
- 在[字符串字面量](/strings-and-characters/#spl)小节添加了关于如何在编译时使用 +  运算符串联字符串。
- 添加了一个注意事项到Metatype 类型章节，关于从 metatype  值构造类实例。
- 添加了一个注意事项到[使用断言进行调试](http://www.cnswift.org/the-basics/#spl-24)小节，关于何时用户定义断言是失效的。
- 更新了声明特性小节@NSManaged标注的讨论，现在标注可以应用到确定的实例方法上了。
- 更新了[可变形式参数](http://www.cnswift.org/functions/#spl-12)小节，现在可变形式参数能被声明在函数形式参数列表的任意位置。
- 添加了关于不可失败初始化器如何通过强制展开父类初始化器结果来向上委托可失败初始化器的相关信息到如何[重写可失败初始化器](https://www.cnswift.org/initialization/#spl-25)章节。
- 添加了使用枚举case 作为函数的信息到任意类型case的枚举章节。
- 添加了关于显式引用一个初始化器的信息到[初始化器表达式](https://www.cnswift.org/initialization/#spl-2)章节。
- 添加了关于创建配置和线性控制语句的信息到编译器控制语句章节。
- 在元类型小节添加了关于对比元类型值并且使用他们与初始化器语法来构造实例。
- 添加了一个注意事项到[弱引用](/automatic-reference-counting/#spl-3)章节，关于弱引用因缓存变得不合适。
- 更新了类型属性章节中的一个注意事项来提醒储存类型属性是惰性初始化的。
- 更新了[捕获值](http://www.cnswift.org/closures/#spl-8)一节来明确变量和常量是如何在闭包中被捕获的。
- 更新了声明特性一节来描述你何时能给类应用@objc 标注。
- 添加了一个注意事项到[处理错误](/error-handling/)一节，关于执行throw 语句的性能。添加了关于do 语句类似的信息到[Do语句](http://www.cnswift.org/error-handling/#_Do-Catch)一节。
- 更新了[类型属性](/properties/#spl-9)小节，关于类、结构体和枚举的储存和计算类型属性。
- 更新了[Break语句](http://www.cnswift.org/control-flow/#Break)小节，关于打了标签的break 语句。
- 更新了[属性观察者](/properties/#spl-7)小节中的一个注意事项，明确了willSet 和didSet 观察者。
- 添加了一个注意事项到访问等级小节，关于private 访问的生效范围。
- 添加了一个注意事项到[弱引用](/automatic-reference-counting/#spl-3)章节，关于垃圾收集器和ARC中弱引用的不同。
- 更新了[字符串字面量中的特殊字符](/strings-and-characters/#spl-8)小节，增加了更多关于 Unicode 标量的清晰定义。
