# 学习笔记

## 新建

* 同 `localstorage`、 `indexDB` 等，有就使用，没有就创建
* 每一条只需要符合语法即可，不像传统SQL，字段要一致等约束
* 插入数据：`db.collection.insert({...})`

## 删除

* `db.dropDatabase()`

## 集合

### 创建

> db.createCollection(name, options)

```javascript
// all certificate
options: {
    capped: Boolean,        // 封顶
    autoIndexId: Boolean,   // 自动创建索引
    size: Number,           // KB
    max: Number,            // 最大条数（文档数）
}
```

### 删除集合

> db.collection.drop()

### 插入文档

> db.collection.insert(document)

### 更新文档

> db.collection.update(query, update, options)

* query: update的查询条件，见 **[查询文档](#quert-document)**
* update: update的对象和一些更新的操作符，见 **[更新操作符](#update-operator)**
* options: {...}
    * upsert: 如果不存在update的记录，是否插入objNew,true为插入，默认是false
    * multi: 更新多条（符合条件的），默认是false
    * writeConcern: 抛出异常的级别

> db.collection.save(document)

* 如果不指定 _id 字段 save() 方法类似于 insert() 方法
* 如果指定 _id 字段，则会更新该 _id 的数据

### 删除文档

> db.collection.remove(query, options)

* query: 删除的文档的条件
* options: {...}
    * justOne: 只删除一个文档
    * writeConcern: 抛出异常的级别

### <span id="quert-document">查询</span>

> db.collection.find(query, projection)

* query: 使用查询操作符指定查询条件
* projection: 使用投影操作符指定返回的键。查询时返回文档中所有键值

> db.collection.find().pretty()
* 格式化
> db.collection.findOne()
* 返回一个

#### AND 操作

> db.collection.find({k1:v1, k2:v2})

#### OR 操作

> db.collection.find({$or:[{k1:v1}, {k2:v2]})

#### AND OR 操作

> db.collection.find({k1:v1, $or:[{k1:v1}, {k2:v2]})

### 操作符

#### 比较操作符

| 操作 | 举例 |
| --- | --- |
| 等于 | {k: 'key'} |
| 小于 | {k: {&lt: 4}} |
| 小于等于 | {k: {&lte: 4}} |
| 大于 | {k: {&gt: 4}} |
| 大于等于 | {k: {&gte: 4}} |
| 不等于 | {k: {&ne: 4}} |
| 包含 | {k: {$in:[7,8]}} |
| 不包含 | {k: {$nin:[7,8]}} |

#### 元操作符

| operator | demo | note |
| --- | --- | --- |
| $exists | 查询所有存在age字段的记录: {age:{$exists:true}}<br>查询所有不存在name字段的记录: {name:{$exists:false}} | 判断字段是否存在 |
| $type | 见下文 | 数据类型操作符 |

| type | code | note |
| --- | --- | --- |
| Double | 1 |  |
| String | 2 |  |
| Object | 3 |  |
| Array | 4|  |
| Binary data | 5 |  |
| Undefined | 6 |  |
| Object id | 7 |  |
| Boolean | 8 |  |
| Date | 9 |  |
| Null | 10 |  |
| Regular Expression | 11 |  |
| JavaScript | 13 |  |
| Symbol | 14 |  |
| JavaScript (with scope) | 15 |  |
| 32-bit integer | 16 |  |
| Timestamp | 17 |  |
| 64-bit integer | 18 |  |
| Min key | 255 |  |
| Max key | 127 |  |

#### <span id="update-operator">更新操作符</span>

| operator | demo | note |
| --- | --- | --- |
| $inc | {$inc:{field:value}} | 对一个数字字段的某个field增加value |
| $set | {$set:{field:value}} | 把文档中某个字段field的值设为value |
| $unset | {$unset:{field:1}} | 删除某个字段field |
| $push | {$push:{field:value}} | 把value追加到field里。<br>注：field只能是数组类型，如果field不存在，会自动插入一个数组类型 |
| $pushAll | {$pushAll:{field:value_array}} | 同$push<br>$pushAll可以一次追加多个值到一个数组字段内。 |
| $addToSet | {$addToSet:{field:value}} | 加一个值到数组内，而且只有当这个值在数组中不存在时才增加。 |
| $pop | 删除数组内第一个值：{$pop:{field:-1}}<br>删除数组内最后一个值：{$pop:{field:1}} | 用于删除数组内的一个值 |
| $pull | {$pull:{field:value}} | 从数组field内删除一个等于 value 的值 |
| $pullAll | {$pullAll:value_array} | 同$pull<br>可以一次性删除数组内的多个值。 |
| $rename | {$rename:{old_field_name:new_field_name}} | 对字段进行重命名 |
|  |  |  |