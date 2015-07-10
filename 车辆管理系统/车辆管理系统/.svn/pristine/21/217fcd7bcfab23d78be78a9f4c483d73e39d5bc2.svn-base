use master

if  exists (select * from sysdatabases where name = 'CarManage')
drop  database CarManage
go 

create database CarManage
on primary 
(
name = 'CarManage_data',
filename = 'D:\project\CarManage_data.mdf',
size = 10,
maxsize = 100,
filegrowth = 10%
)

log on
(
name = 'CarManage_log',
filename = 'D:\project\CarManage_log.ldf',
size =3 ,
maxsize =40 ,
filegrowth =15%
)
go


use CarManage

--创建  车型信息表 CarTypeInfo 
if exists (select * from sysobjects where name = 'CarTypeInfo')
drop table  CarTypeInfo
go

create table CarTypeInfo 
(
CTId int primary key identity(1,1),
CarType nvarchar(50) not null,
)
go


insert into CarTypeInfo (CarType) values('小型汽车')
insert into CarTypeInfo (CarType) values('小型自动挡汽车')
insert into CarTypeInfo (CarType) values('中型客车')
insert into CarTypeInfo (CarType) values('大型客车')
insert into CarTypeInfo (CarType) values('索引车')
insert into CarTypeInfo (CarType) values('城市公交车')
insert into CarTypeInfo (CarType) values('大型货车')
insert into CarTypeInfo (CarType) values('低速载货汽车')
insert into CarTypeInfo (CarType) values('三轮汽车')

go


--创建  车辆颜色信息表    CarColorInfo 
if exists (select * from sysobjects where name = 'CarColorInfo')
drop table  CarColorInfo
go

create table CarColorInfo
(
CCId int primary key identity(1,1),   
CarColor nvarchar(50) not null,
)
go


insert into CarColorInfo (CarColor) values('黑色')
insert into CarColorInfo (CarColor) values('白色')
insert into CarColorInfo (CarColor) values('银色')
insert into CarColorInfo (CarColor) values('灰色')
insert into CarColorInfo (CarColor) values('红色')
insert into CarColorInfo (CarColor) values('黄色')
insert into CarColorInfo (CarColor) values('蓝色')
insert into CarColorInfo (CarColor) values('绿色')

go



-- 创建   车辆用途信息表  CarUseInfo

if exists (select * from sysobjects where name = 'CarUseInfo')
drop table  CarUseInfo
go

create table CarUseInfo 
(
CUId int primary key identity(1,1),   
CarUse nvarchar(50) not null,


)
go


insert into CarUseInfo (CarUse) values('公务')
insert into CarUseInfo (CarUse) values('长途')
insert into CarUseInfo (CarUse) values('作业用车')

go



-- 创建  车辆状态信息表  CarStateInfo

if exists (select * from sysobjects where name = 'CarStateInfo')
drop table  CarStateInfo
go

create table CarStateInfo 
(
CSId int primary key identity(1,1),   
CarState nvarchar(50) not null,
)

go


insert into CarStateInfo (CarState) values('可用')
insert into CarStateInfo (CarState) values('损坏')
insert into CarStateInfo (CarState) values('维修中')
insert into CarStateInfo (CarState) values('报废')

go





-- 创建  车辆信息维护  CarInfo
if exists (select * from sysobjects where name = 'CarInfo')
drop table  CarInfo
go

create table CarInfo 
(
CarId int primary key identity(1,1),
CarNum nvarchar(50) not null,
CarType nvarchar(50) not null,
LabelNum nvarchar(50) not null,
CarColor nvarchar(50) not null,
CarSeat int not null,
CarUse  nvarchar(50) null ,
CarState  nvarchar(50) null,
CarMsg nvarchar(50) null,
CarImg  nvarchar(50) null,
CarAss nvarchar(50) null,
)
go


insert into CarInfo (CarNum,CarType,LabelNum,CarColor,CarSeat,CarUse,CarState) 
values('鲁A00001','小型汽车','大众车','黑色',3,'公务','可用')

insert into CarInfo (CarNum,CarType,LabelNum,CarColor,CarSeat,CarUse,CarState) 
values('鲁A00002','小型自动档汽车','奇瑞','银色',3,'长途','损坏')

insert into CarInfo (CarNum,CarType,LabelNum,CarColor,CarSeat,CarUse,CarState) 
values('鲁A00003','中型客车','公交','白色',3,'公务','可用')

insert into CarInfo (CarNum,CarType,LabelNum,CarColor,CarSeat,CarUse,CarState) 
values('鲁A00004','大型客车','大众车','黑色',3,'公务','可用')
go

