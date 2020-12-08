/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2020/12/6 21:52:38                           */
/*==============================================================*/


drop table if exists Adminstator;

drop table if exists achievement;

drop table if exists deskmate;

drop table if exists event;

drop table if exists shop_baozi;

drop table if exists shop_sound;

drop table if exists steamer;

drop table if exists tag;

drop table if exists user;

/*==============================================================*/
/* Table: Adminstator                                           */
/*==============================================================*/
create table Adminstator
(
   adminstrator_id      int,
   adminstrator_pwd     varchar(50)
);

alter table Adminstator comment 'Adminstator';

/*==============================================================*/
/* Table: achievement                                           */
/*==============================================================*/
create table achievement
(
   achievement_id       int not null,
   user_id              int,
   achievement_name     varchar(50),
   achievement_discribe varchar(200),
   achievement_islocked bool,
   primary key (achievement_id)
);

alter table achievement comment 'achievement';

/*==============================================================*/
/* Table: deskmate                                              */
/*==============================================================*/
create table deskmate
(
   deskmate_user_id     int not null,
   user_id              int,
   deskmate_time        int,
   primary key (deskmate_user_id)
);

alter table deskmate comment 'deskmate';

/*==============================================================*/
/* Table: event                                                 */
/*==============================================================*/
create table event
(
   event_id             int not null,
   user_id              int,
   event_discribe       varchar(200),
   event_time           varchar(50),
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
/* Table: shop_sound                                            */
/*==============================================================*/
create table shop_sound
(
   shop_sound_id        int not null,
   user_id              int,
   sound_isbuy          bool,
   primary key (shop_sound_id)
);

alter table shop_sound comment 'shop_sound';

/*==============================================================*/
/* Table: steamer                                               */
/*==============================================================*/
create table steamer
(
   steamer_id           int not null,
   user_id              int,
   steamer_main_count   int,
   steamer_dietree_count int,
   steamer_livetree_count int,
   steamer_time_count   int,
   primary key (steamer_id)
);

alter table steamer comment 'steamer';

/*==============================================================*/
/* Table: tag                                                   */
/*==============================================================*/
create table tag
(
   tag_id               int not null,
   user_id              int,
   tag_discribe         varchar(200),
   primary key (tag_id)
);

alter table tag comment 'tag';

/*==============================================================*/
/* Table: user                                                  */
/*==============================================================*/
create table user
(
   user_id              int not null,
   user_name            varchar(50),
   user_pwd             varchar(50),
   user_loginNum        varchar(50),
   user_money           int,
   primary key (user_id)
);

alter table user comment 'user';

alter table achievement add constraint FK_Relationship_3 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table deskmate add constraint FK_Relationship_9 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table event add constraint FK_Relationship_8 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table shop_baozi add constraint FK_Relationship_6 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table shop_sound add constraint FK_Relationship_5 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table steamer add constraint FK_Relationship_2 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

alter table tag add constraint FK_Relationship_7 foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

