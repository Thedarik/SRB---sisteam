-- Add description column to theam table
ALTER TABLE public.theam 
ADD COLUMN description text NULL;

-- Add comment to the column
COMMENT ON COLUMN public.theam.description IS 'Theme description for better understanding';
