---
title: "在 Swift 中使用 JSON"
date: 2016-09-13
categories: 
  - "swift-blog"
---

如果你的应用与 Web 应用通信，从服务器返回的信息经常是 [JSON](http://www.json.org/) 格式。你可以使用 Foundation 框架里的 [JSONSerialization](https://developer.apple.com/reference/foundation/nsjsonserialization) 类来转换 JSON 为 Swift 的数据类型，比如Dictionary 、Array 、String 以及Bool 。总之，由于你不能确定应用接收的 JSON 的结构体或者值，可以通过挑战来正确地反序列化模型对象。这篇文章描述了几种你在应用中使用 JSON 时可以使用的方法。

## 从 JSON 中取出值

JSONSerialization 类方法jsonObject(with:options:) 返回类型为Any 的值并且在不能取得数据时抛出错误。

```
import Foundation

let data: Data // received from a network request, for example
let json = try? JSONSerialization.jsonObject(with: data, options: [])
```

尽管有效的 JSON [可以只包含一个值](http://www.ecma-international.org/publications/standards/Ecma-404.htm)，但从 Web 应用返回的 JSON 一般编码了一个对象或者以数组作为顶级对象。你可以在if 或者guard 语句中使用可选绑定和as? 类型转换运算符来以常量的形式取出已知类型的值。要获从 JSON 对象类型中获取一个字典值，可以把它转换为\[String: Any\] 。要从 JSON 数组类型获取一个数组值，可以转换为\[Any\] （或者更具体的元素类型，比如\[String\] ）。配合下标或者枚举的类型匹配类型转换可选绑定，你可以通过键取出字典值或者通过索引取出数组值。

```
// Example JSON with object root:
/*
	{
		"someKey": 42.0,
		"anotherKey": {
			"someNestedKey": true
		}
	}
*/
if let dictionary = jsonWithObjectRoot as? [String: Any] {
	if let number = dictionary["someKey"] as? Double {
		// access individual value in dictionary
	}

	for (key, value) in dictionary {
		// access all key / value pairs in dictionary
	}

	if let nestedDictionary = dictionary["anotherKey"] as? [String: Any] {
		// access nested dictionary values by key
	}
}

// Example JSON with array root:
/*
	[
		"hello", 3, true
	]
*/
if let array = jsonWithArrayRoot as? [Any] {
	if let firstObject = array.first {
		// access individual object in array
	}

	for object in array {
		// access all objects in array
	}

	for case let string as String in array {
		// access only string values in array
	}
}
```

Swift 的内置语言特性使得通过 Foundation 的 API 解码 JSON 并安全地取出值十分简单——完全不需要额外的库或者框架。

## 从 JSON 取出的值创建模型对象

考虑到大多数 Swift 应用遵循 [Model-View-Controller](https://developer.apple.com/library/ios/documentation/General/Conceptual/DevPedia-CocoaCore/MVC.html) 设计模式，转换 JSON 数据到你应用中特定的对象模型定义中就显得十分给力。

比如说，当写一个提供本地餐馆搜索结果的应用，你可能需要实现一个接受 JSON 对象来初始化Restaurant 模型，并实现一个类型方法使用 HTTP 请求服务器的/search 终点然后异步返回Restaurant 对象的数组。

比如说下面的Restaurant 模型：

```
import Foundation

struct Restaurant {
	enum Meal: String {
		case breakfast, lunch, dinner
	}

	let name: String
	let location: (latitude: Double, longitude: Double)
	let meals: Set<Meal>
}
```

一个Restaurant 拥有String 类型的名字，一个使用坐标对表示的location 以及一个包换内嵌Meal 枚举的Set 类型meals 。

这里有一个服务器回复的餐厅例子，这是其中一条：

```
{
	"name": "Caffè Macs",
	"coordinates": {
		"lat": 37.330576,
		"lng": -122.029739
	},
	"meals": ["breakfast", "lunch", "dinner"]
}
```

### 写一个可选 JSON 初始化器

要把 JSON 表示转换为Restaurant 对象，写一个接收任何从 JSON 表示取出并转换为属性的实际参数的初始化器。

```
extension Restaurant {
	init?(json: [String: Any]) {
		guard let name = json["name"] as? String,
			let coordinatesJSON = json["coordinates"] as? [String: Double],
			let latitude = coordinatesJSON["lat"],
			let longitude = coordinatesJSON["lng"],
			let mealsJSON = json["meals"] as? [String]
		else {
			return nil
		}

		var meals: Set<Meal> = []
		for string in mealsJSON {
			guard let meal = Meal(rawValue: string) else {
				return nil
			}

			meals.insert(meal)
		}

		self.name = name
		self.coordinates = (latitude, longitude)
		self.meals = meals
	}
}
```

如果你应用与一个或者多个服务器通信，它们也不返回单一、固定的模型对象表示，考虑实现多个初始化器来处理每一种可能的表达方式。

在上边的例子中，每一个值都通过可选绑定和as? 类型转换运算符从传入的 JSON 字典中取出到常量中。对于name 属性，取出的name 值就直接赋值给了它。对于coordinate 属性，取出的latitude 和longitude 在赋值之前被组合成一个元组。对于meals 属性，取出的字符串值被遍历到Meal 枚举值的Set 类型常量中。

### 写带有错误处理的 JSON 初始化器

先前的例子实现了一个可选的初始化器，如果反序列化失败就返回nil 。

另外，你还可以定义一个类型遵循Error 协议并且实现一个如果反序列化失败就抛出错误的初始化器。

```
enum SerializationError: Error {
	case missing(String)
	case invalid(String, Any)
}

extension Restaurant {
	init(json: [String: Any]) throws {
		// Extract name
		guard let name = json["name"] as? String else {
			throw SerializationError.missing("name")
		}

		// Extract and validate coordinates
		guard let coordinatesJSON = json["coordinates"] as? [String: Double],
			let latitude = coordinatesJSON["lat"],
			let longitude = coordinatesJSON["lng"]
		else {
			throw SerializationError.missing("coordinates")
		}

		let coordinates = (latitude, longitude)
		guard case (-90...90, -180...180) = coordinates else {
			throw SerializationError.invalid("coordinates", coordinates)
		}

		// Extract and validate meals
		guard let mealsJSON = json["meals"] as? [String] else {
			throw SerializationError.missing("meals")
		}

		var meals: Set<Meal> = []
		for string in mealsJSON {
			guard let meal = Meal(rawValue: string) else {
				throw SerializationError.invalid("meals", string)
			}

			meals.insert(meal)
		}

		// Initialize properties
		self.name = name
		self.coordinates = coordinates
		self.meals = meals
	}
}
```

这样，Restaurant 类型声明了一个内嵌的SerializationError 类型，它使用关联值定义了丢失或者非法属性的枚举情况。在抛出版本的 JSON 初始化器中，不是用返回nil 来表示失败，而是抛出了一个带有特定失败信息的错误。这个版本还验证输入数据来确保坐标表示是合法的几何坐标对并且每个在 JSON 中提到的meals 的名字都能在Meal 中对的上号。

### 写一个获取结果的类型方法

一个 Web 应用终端通常在一个 JSON 响应中返回多个资源。比如说，一个/search 终端可能返回零到多个符合查询参数并带有其他元信息但包换这些表达的餐厅：

```
{
	"query": "sandwich",
	"results_count": 12,
	"page": 1,
	"results": [
		{
			"name": "Caffè Macs",
			"coordinates": {
				"lat": 37.330576,
				"lng": -122.029739
			},
			"meals": ["breakfast", "lunch", "dinner"]
		},
		...
	]
}
```

你可以在Restaurant 结构体中创建一个类型方法来翻译查询方法形式参数为相应请求对象并发送 HTTP 请求到 Web 服务。这个代码同样也负责处理响应、反序列化 JSON 数据、从"results" 数组取出的每一个字典创建Restaurant 对象以及在一个回调函数中异步返回这些对象。

```
extension Restaurant {
	private let urlComponents: URLComponents // base URL components of the web service
	private let session: URLSession // shared session for interacting with the web service

	static func restaurants(matching query: String, completion: ([Restaurant]) -> Void) {
		var searchURLComponents = urlComponents
		searchURLComponents.path = "/search"
		searchURLComponents.queryItems = [URLQueryItem(name: "q", value: query)]
		let searchURL = searchURLComponents.url!

		session.dataTask(url: searchURL, completion: { (_, _, data, _)
			var restaurants: [Restaurant] = []

			if let data = data,
				let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
				for case let result in json["results"] {
					if let restaurant = Restaurant(json: result) {
						restaurants.append(restaurant)
					}
				}
			}

			completion(restaurants)
		}).resume()
	}
}
```

当用户输入文本到搜索栏来弹出一个table view显示匹配的结果时，视图控制器会调用这个方法：

```
import UIKit

extension ViewController: UISearchResultsUpdating {
	func updateSearchResultsForSearchController(_ searchController: UISearchController) {
		if let query = searchController.searchBar.text, !query.isEmpty {
			Restaurant.restaurants(matching: query) { restaurants in
				self.restaurants = restaurants
				self.tableView.reloadData()
			}
		}
	}
}
```

通过这种方法分离重心来为从view controller访问餐厅资源提供一个一致的接口，就算 Web 服务的实现细节改变也无所谓。

## 总而言之

相同数据在表示形式上的转换是为了在不同的系统之间通信，这是一个写代码中无聊但必须的工作。

由于这些表现形式的结构可能十分相似，尝试创建一个高级抽象来在这些不同的表现形式之间自动映射是可行的。举例来说，一个类型使用 Swift 的reflection API，可能定义一个在 下划线命名法 JSON 键与驼峰式命名法属性名之间的映射来自动地从 JSON 初始化一个模型，比如说[Mirror](https://developer.apple.com/reference/swift/mirror)。

总之，我们发现这些抽象非但不能通过 Swift 语言方便的特性提供优越的好处，反而让调试问题变得更加棘手。在上边的例子中，初始化器不仅取出并从 JSON 映射值，还初始化复杂的数据类型并执行特定域名输入验证。基于reflection的方案为了完成任务把名字搞的老长。当你为自己的应用估算可用策略时要记得这些。大量的重复可能显然地比选错一个抽象更节省开销。
