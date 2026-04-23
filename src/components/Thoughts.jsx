import React, { useState, useEffect, useRef, useCallback } from "react";
import "../css/Thoughts.css";

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/comment`;

/* ─── helpers ─── */
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initials(name = "") {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

const AVATAR_COLORS = [
  "#a78bfa",
  "#34d399",
  "#fb7185",
  "#fbbf24",
  "#38bdf8",
  "#f472b6",
  "#a3e635",
];

function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = name.charCodeAt(i) + ((h << 5) - h);
  }
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

/* ═══════════════════════════════════════
   COMMENT CARD
═══════════════════════════════════════ */
function CommentCard({ comment, delay = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const PREVIEW_LEN = 160;
  const isLong = comment.message?.length > PREVIEW_LEN;
  const color = avatarColor(comment.name);

  useEffect(() => {
    let r1, r2, t;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        t = setTimeout(() => setVisible(true), delay);
      });
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      clearTimeout(t);
    };
  }, [delay]);

  return (
    <article ref={ref} className={`tc ${visible ? "tc--visible" : ""}`}>
      <div className="tc__top">
        <div className="tc__avatar" style={{ "--ac": color }}>
          {initials(comment.name) || "?"}
        </div>
        <div className="tc__meta">
          <span className="tc__name">{comment.name || "Anonymous"}</span>
          {comment.relation && (
            <span className="tc__relation">{comment.relation}</span>
          )}
          <span className="tc__time">
            {timeAgo(comment.createdAt || new Date())}
          </span>
        </div>
      </div>

      <p className="tc__msg">
        {isLong && !expanded ? (
          <>
            {comment.message.slice(0, PREVIEW_LEN)}
            <span className="tc__ellipsis">…</span>
          </>
        ) : (
          comment.message
        )}
      </p>

      {isLong && (
        <button className="tc__expand" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>
      )}

      <span className="tc__quote">"</span>
    </article>
  );
}

/* ═══════════════════════════════════════
   COMMENT FORM
═══════════════════════════════════════ */
function CommentForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", relation: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setError("Name and message are required.");
      return;
    }
    setStatus("success");

    setTimeout(() => setStatus("idle"), 2000);

    setStatus("loading");
    setError("");

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      const saved = await res.json();

      setStatus("success");
      setForm({ name: "", relation: "", message: "" });

      // 🔥 instant UI update (no refetch)
      onSuccess?.(saved.data);

      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.(check message lengh!)");
    }
  };

  return (
    <form className="tform" onSubmit={handleSubmit} noValidate>
      <div className="tform__header">
        <h2 className="tform__title">Leave a thought</h2>
        <p className="tform__sub">
          Worked with me or know me? I'd love to hear from you.
        </p>
      </div>

      <div className="tform__row">
        <div className="tform__field">
          <label className="tform__label">Your name *</label>
          <input
            className="tform__input"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <span className="tform__count">{form.name.length} / 100</span>
        </div>

        <div className="tform__field">
          <label className="tform__label">How do you know me?</label>
          <input
            className="tform__input"
            name="relation"
            value={form.relation}
            onChange={handleChange}
          />
          <span className="tform__count">{form.relation.length} / 100</span>
        </div>
      </div>

      <div className="tform__field">
        <label className="tform__label">Your thoughts *</label>
        <textarea
          className="tform__textarea"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
        />
        <span className="tform__count">{form.message.length} / 500</span>
      </div>

      {error && <p className="tform__error">{error}</p>}

      <button
        className={`tform__submit 
    ${status === "loading" ? "tform__submit--loading" : ""} 
    ${status === "success" ? "tform__submit--success" : ""}`}
        type="submit"
        disabled={status === "loading" || status === "success"}
      >
        {status === "loading" && <span className="tform__spinner" />}

        {status === "success"
          ? "✓ Thought posted!"
          : status === "loading"
            ? "Posting…"
            : "Post thought →"}
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
function Thoughts() {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const fetchComments = useCallback(async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(`${API_BASE}?page=${pageNum}&limit=10`);

      if (!res.ok) throw new Error();

      const data = await res.json();

      if (pageNum === 1) {
        setComments(data.data);
      } else {
        setComments((prev) => [...prev, ...data.data]);
      }

      setHasMore(pageNum < data.totalPages);
      setFetchError(false);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchComments(1);
  }, [fetchComments]);

  const loadMore = () => {
    if (loadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchComments(nextPage);
  };

  const handleNewComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="tpage">
      <div className="tpage__mesh" />

      <header className="tpage__header">
        <span className="tpage__eyebrow">Community</span>
        <h1 className="tpage__title">
          Thoughts<span className="tpage__title--dot">.</span>
        </h1>
        <p className="tpage__sub">
          What people who know or worked with Pritesh have to say.
        </p>

        {!loading && (
          <span className="tpage__count">{comments.length} thoughts</span>
        )}
      </header>

      <CommentForm onSuccess={handleNewComment} />

      <div className="tpage__divider">
        <span>What others said</span>
      </div>

      <div className="tpage__list-wrap">
        {loading && comments.length === 0 && (
          <div className="tpage__loading">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="tpage__skeleton" />
            ))}
          </div>
        )}

        {fetchError && (
          <div className="tpage__empty">
            <span>⚠</span>
            <p>Error loading comments</p>
          </div>
        )}

        <div className="tpage__grid">
          {comments.map((c, i) => (
            <CommentCard
              key={c._id ?? i}
              comment={c}
              delay={Math.min(i * 60, 300)}
            />
          ))}
        </div>

        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              className="tpage__retry"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load more ↓"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Thoughts;
