#### mongoose_todo_app

#### 技术说明
- express: nodejs服务端框架
- mongoose: mongodb数据库，用户存储数据
- redis: redis缓存数据库，用户存储用户登录信息

#### api 列表
1.用户权限相关接口

| 名称 | 路径 | 方式 | 参数 |  是否登录 |
| --- | ---     | ---     | ---     | ---  |
| 注册 | /user/register | post | username, password | 否 |
| 登录 | /user/login | post | username, password | 否 |

2.todo相关接口

| 名称| 路径 | 方式 | 参数 | 是否登录 |
| --- | ---  | --- | ---  | ---    |
| 添加 | /todo/add | post | content(内容) | 是 |
| 获取列表 | /todo/list | get/post | pageNo(默认：1), pageSize(默认：10) | 是 |
| 详情 | /todo/detail | get/post | id | 是 |
| 删除 | /todo/delete | post | id | 是 |
| 更新 | /todo/update | post | id, content | 是 |