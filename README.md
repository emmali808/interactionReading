# interactionReading
##一、文件介绍
1.legal_doc————网站系统前端，基于vue搭建。\
2.legaldocument————系统后端，Springboot+MyBatis+MySQL+Redis+Lucene。\
3.QAPlugin————问答注解子系统插件前端。\
4.WikiPlugin————关键词链接子系统插件前端。\
5.wikiIndex————wiki数据索引文件。\
6.QAIndex————QA数据索引文件。\
7.legaldocument.sql————数据库sql文件。包含系统数据结构和相关数据。\
##二、部署介绍
###2.1 开发工具
IDEA，前后端都在IDEA上开发。安装最新版即可。需要配置jdk。原使用jdk1.8。\
可参考：https://blog.csdn.net/weixin_42045759/article/details/101988140\
###2.2 前端
基于vue框架开发，需要安装Node.js与全局安装vue-cli。原node.js版本为Node.js12.13.1。\
可参考：https://www.jianshu.com/p/dc087bf01475\
###2.3 后端
1.MySQL 原版本5.7.24，安装版本为5.0.0以上的即可。建议安装Navicat for MySQL进行数据库管理。将legaldocument.sql文件直接导入在数据库。修改项目配置文件application.properties里的数据库配置，为自己的数据库。\
MySQL安装教程可参考：https://blog.csdn.net/rucia/article/details/81288235?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.nonecase\
2.lucene版本为6.0.0。将Lucene索引文件夹，wikiIndex、QAIndex放到存储位置。修改后端索引相关代码中索引文件夹对应路径。\
3.redis。。。\
