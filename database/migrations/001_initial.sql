CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feedback (
  id BIGSERIAL PRIMARY KEY,
  programme TEXT NOT NULL,
  session TEXT NOT NULL,
  class CHAR(1) NOT NULL,
  level TEXT NOT NULL,
  feedback_type TEXT NOT NULL,
  feedback_message TEXT NOT NULL CHECK (char_length(feedback_message) BETWEEN 5 AND 5000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS feedback_created_at_idx ON feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS feedback_programme_idx ON feedback (programme);
CREATE INDEX IF NOT EXISTS feedback_session_idx ON feedback (session);
CREATE INDEX IF NOT EXISTS feedback_class_idx ON feedback (class);
CREATE INDEX IF NOT EXISTS feedback_level_idx ON feedback (level);
CREATE INDEX IF NOT EXISTS feedback_type_idx ON feedback (feedback_type);
