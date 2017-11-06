# react-course

移动端网站模板

#### Note

Curse 项目部分移动端界面

## 运行项目

**安装依赖**
	
	npm install

**启动项目开发模式**

	npm start


## 项目结构

	page -> 角色页面
	
	commons -> 放置公共组件

	container -> 放置页面内容
	
		containerName -> 内容组件
			
			compontent -> 放置所需组件
			
			containerName.js
			
			containerName.less

## 页面以及所需接口

### User Info

![User Info Page](https://raw.githubusercontent.com/TommyHili/react-course/master/images/user_image_1.jpeg)

**所需接口**

1. 获取用户基础信息
   
	GET /api/user/:userId/info

	[页面加载数据](https://raw.githubusercontent.com/TommyHili/react-course/master/src/containers/UserInfo/mokeUserData.js)



### User Course Page

![User Course Page](https://raw.githubusercontent.com/TommyHili/react-course/master/images/user_image_2.jpeg)

**所需接口**

1. 获取课程列表
	
	GET /api/courselist

	[页面加载数据](https://raw.githubusercontent.com/TommyHili/react-course/master/src/containers/CourseList/mokeDate.js)

2. 获取课程详情

	GET /api/coursedetail/:courseid
	
### User Course detail

![](https://raw.githubusercontent.com/TommyHili/react-course/master/images/user_image_3.jpg)

### User Destine page

![User Destine Page](https://raw.githubusercontent.com/TommyHili/react-course/master/images/user_image_4.jpg)

### User Destine Detail

![User Course Page](https://raw.githubusercontent.com/TommyHili/react-course/master/images/user_image_5.jpg)


