-- ALTER TABLE articles 
-- ALTER COLUMN content 
-- SET DATA TYPE jsonb 
-- USING to_jsonb(content);
ALTER TABLE plantTable
ADD COLUMN content JSONB 
