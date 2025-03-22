ALTER TABLE public.flyway_schema_history
    ADD COLUMN checksum varchar(255);

ALTER TABLE public.flyway_schema_history
    ADD COLUMN installed_by varchar(255);

ALTER TABLE public.flyway_schema_history
    ADD COLUMN execution_time integer;