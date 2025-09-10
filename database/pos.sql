-- Create POS customers table
create table pos_customers (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    phone_number text not null,
    shop_id uuid references shops(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    -- Add unique constraint on phone number per shop
    unique(phone_number, shop_id)
);

-- Add customer reference to shop_orders
alter table shop_orders 
add column customer_id uuid references pos_customers(id);

-- Add index for faster lookups
create index idx_pos_customers_shop on pos_customers(shop_id);
create index idx_pos_customers_phone on pos_customers(phone_number);
