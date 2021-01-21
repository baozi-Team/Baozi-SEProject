/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2021/1/20 15:15:52                           */
/*==============================================================*/


drop table if exists Adminstator;

drop table if exists event;

drop table if exists shop_baozi;

drop table if exists steamer;

drop table if exists user;

/*==============================================================*/
/* Table: Adminstator                                           */
/*==============================================================*/
create table Adminstator
(
   administrator_id     int not null,
   administrator_pwd    varchar(50),
   primary key (administrator_id)
);

alter table Adminstator comment 'Adminstator';

/*==============================================================*/
/* Table: event                                                 */
/*==============================================================*/
create table event
(
   event_id             int not null auto_increment,
   user_id              int,
   event_discribe       varchar(200),
   event_time           varchar(50),
   event_date           varchar(100),
   primary key (event_id)
);

alter table event comment 'event';

/*==============================================================*/
/* Table: shop_baozi                                            */
/*==============================================================*/
create table shop_baozi
(
   shop_baozi_id        int not null,
   user_id              int,
   baozi_isbuy          bool,
   primary key (shop_baozi_id)
);

alter table shop_baozi comment 'shop_baozi';

/*==============================================================*/
/* Table: steamer                                               */
/*==============================================================*/
create table steamer
(
   steamer_id           int not null auto_increment,
   user_id              int,
   steamer_main_count   int,
   steamer_dietree_count int,
   steamer_livetree_count int,
   steamer_time_count   int,
   primary key (steamer_id)
);

alter table steamer comment 'steamer';

/*==============================================================*/
/* Table: user                                                  */
/*==============================================================*/
create table user
(
   user_id              int not null auto_increment,
   steamer_id           int,
   user_name            varchar(50),
   user_money           int,
   user_avatarUrl       varchar(300),
   primary key (user_id)
);

alter table user comment 'user';

alter table event add constraint FK_Relationship_8 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table shop_baozi add constraint FK_Relationship_6 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table steamer add constraint FK_Relationship_3 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table user add constraint FK_Relationship_2 foreign key (steamer_id)
      references steamer (steamer_id) on delete restrict on update restrict;

