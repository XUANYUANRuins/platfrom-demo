### 项目模块说明
1. gov-asset-aims-api 存放接口类及`Mapper、model`类
2. gov-asset-aims-common 存放工具类等
3. gov-asset-aims-spi 存放接口实现类及`mybatis`xml文件
4. gov-asset-aims-web 存放控制层`controller` 

### 快速开发插件简单说明
根据树形结构顺序一一创建对应的java文件
如下图
![](http://58.22.61.222:18001/productline-egov/gov-asset-aims/raw/master/images/1.png)

### 系统菜单项说明
目前先通过修改`gov-asset-aims-web`下的`src\main\webapp\WEB-INF\views\platform\mainframe\main.jsp`文件新增菜单项。相应配置参数可以参照已有节点相应配置。后期改成数据库中存储。
![](http://58.22.61.222:18001/productline-egov/gov-asset-aims/raw/master/images/2.png)

### git使用说明
1. 先`git clone `远程仓库的dev分支到本地仓库
2. 本地创建分支`dev-xxx`开发人员姓名简称，开发都在此分支上进行 
3. 每天下班前把本地分支`dev-xxx`推送至远程git仓库对应分支`dev-xxx`上。
4. 若远程分支`dev`有更新，可自行`merge`远程分支和本地分支。（建议每天上班前合并下远程`dev`和本地`dev-xxx`分支）

### 项目数据库地址

- ip:192.168.10.37
- 用户名:asset_aims
- 密码:bs