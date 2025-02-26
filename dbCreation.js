const createCabinsTable = `create table Cabins(
  cabin_id int generated always as identity,
  created_at timestamp default now(),
  name varchar(255),
  discount int,
  regular_price int not null,
  max_capacity int,
  description text,
  image varchar(255) default null,
  primary Key (cabin_id)
)`;

const createGuestsTable = `create Table Guests(
  guest_id int generated always as identity,
  created_at timestamp  default now(),
  full_name varchar(100) not null,
  email varchar(255) not null,
  national_id varchar(20),
  country_flag text,
  nationality varchar(255),
  primary key (guest_id) 
)`;

const createBookingsTable = `create Table Bookings(
  booking_id int generated always as identity,
  created_at timestamp default now(),
  start_date timestamp,
  end_date timestamp,
  num_nights int,
  num_guests int,
  cabin_price float,
  total_price float,
  status varchar(100),
  has_breakfast boolean default false,
  observations text ,
  cabin_id int,
  guest_id int,
  primary key (booking_id),
  foreign key (cabin_id) references Cabins(cabin_id) on delete cascade ,
  foreign key (guest_id) references Guests(guest_id) on delete cascade 
)`;

const createSettingsTable = `create Table Settings(
  setting_id int generated always as identity,
  max_booking_length int,
  min_booking_length int,
  max_guest_per_booking int,
  breakfast_price float,
  primary key (setting_id)
)`;

const createUsersTable = `create Table Users(
  user_id int generated always as identity,
  created_at timestamp  default now(),
  full_name varchar(100) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  password_confirm varchar(255) not null,
  primary key (user_id)
)`;
