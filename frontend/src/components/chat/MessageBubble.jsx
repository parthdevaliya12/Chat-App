import { useState, useRef, useEffect } from 'react';
import { formatMessageTime } from '../../lib/utils';
import { HiCheck, HiOutlineEyeSlash, HiOutlinePencil, HiOutlineTrash, HiOutlineXMark, HiOutlineArrowDownTray } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useChatStore } from '../../store/useChatStore';

const MOOD_EMOJI = {
  happy: '😊',
  love: '❤️',
  sad: '😢',
  fire: '🔥',
  chill: '🌿',
  think: '🤔',
};

export default function MessageBubble({ message, isOwn, isConsecutive }) {
  const [whisperRevealed, setWhisperRevealed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(message.text || '');
  const editInputRef = useRef(null);

  const { editMessage, deleteMessage } = useChatStore();

  const isWhisper = message.isWhisper;
  const mood = message.mood;
  const moodClass = mood ? `mood-${mood}` : '';

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editValue.trim() && editValue !== message.text) {
      editMessage(message._id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    toast('Delete this message?', {
      action: {
        label: 'Delete',
        onClick: () => deleteMessage(message._id)
      },
      cancel: {
        label: 'Cancel'
      }
    });
  };

  // Smart border radius based on consecutive messages
  let borderRadius = isOwn 
    ? 'rounded-2xl rounded-tr-sm' 
    : 'rounded-2xl rounded-tl-sm';
    
  if (isConsecutive) {
    borderRadius = 'rounded-2xl';
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} ${isConsecutive ? 'mt-1' : 'mt-4'}`}
    >
      <div className="relative max-w-[75%] sm:max-w-[65%] group flex items-center gap-2">
        
        {/* Action Menu (Visible on hover for own messages) */}
        {isOwn && !isEditing && (
          <div className={`absolute top-1/2 -translate-y-1/2 ${isOwn ? 'right-[calc(100%+0.5rem)]' : 'left-[calc(100%+0.5rem)]'} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
            {message.text && !message.image && (
              <button 
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded-full bg-pearl-200 dark:bg-midnight-800 text-midnight-500 hover:text-azure-600 dark:hover:text-azure-400 transition-colors shadow-sm"
                title="Edit message"
              >
                <HiOutlinePencil className="w-3.5 h-3.5" />
              </button>
            )}
            <button 
              onClick={handleDelete}
              className="p-1.5 rounded-full bg-pearl-200 dark:bg-midnight-800 text-midnight-500 hover:text-rose-500 transition-colors shadow-sm"
              title="Delete message"
            >
              <HiOutlineTrash className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="relative">
          {/* Mood emoji floating badge */}
          {mood && MOOD_EMOJI[mood] && (
            <span className={`absolute -top-3 ${isOwn ? '-left-3' : '-right-3'} text-lg z-10 drop-shadow-md bg-white dark:bg-midnight-800 rounded-full p-0.5 border border-pearl-200 dark:border-midnight-700`}>
              {MOOD_EMOJI[mood]}
            </span>
          )}

          <div
            className={`p-3.5 ${moodClass} ${borderRadius} transition-all duration-200 ${
              isOwn
                ? 'gradient-bg-azure text-midnight-950 shadow-md shadow-azure-500/20'
                : 'bg-white dark:bg-midnight-800 text-midnight-900 dark:text-pearl-50 shadow-sm border border-pearl-200/50 dark:border-midnight-700/50'
            }`}
          >
            {/* Whisper indicator */}
            {isWhisper && (
              <div className="flex items-center gap-1.5 mb-2 opacity-80">
                <HiOutlineEyeSlash className={`w-3.5 h-3.5 ${isOwn ? 'text-midnight-900' : 'text-midnight-500'}`} />
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isOwn ? 'text-midnight-900' : 'text-midnight-500'}`}>
                  Whisper {isOwn ? '' : (whisperRevealed ? '(Revealed)' : '(Hidden)')}
                </span>
              </div>
            )}

            {/* Image */}
            {message.image && (
              <div className="relative group/image inline-block">
                <img
                  src={message.image}
                  alt="Attachment"
                  className={`w-full max-w-xs rounded-xl mb-2 object-cover cursor-pointer hover:opacity-90 transition-opacity ${
                    isWhisper && !isOwn && !whisperRevealed ? 'whisper-blur' : ''
                  }`}
                  onClick={() => {
                    if (isWhisper && !whisperRevealed) {
                      setWhisperRevealed(true);
                    } else {
                      window.open(message.image, '_blank');
                    }
                  }}
                />
                {(!isWhisper || whisperRevealed || isOwn) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fetch(message.image)
                        .then(res => res.blob())
                        .then(blob => {
                          const url = window.URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.style.display = 'none';
                          link.href = url;
                          link.download = `LinkUp-Media-${Date.now()}.png`;
                          document.body.appendChild(link);
                          link.click();
                          window.URL.revokeObjectURL(url);
                          document.body.removeChild(link);
                        })
                        .catch(err => console.error('Download failed', err));
                    }}
                    className="absolute top-2 right-2 p-2 bg-midnight-950/60 hover:bg-midnight-950 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-all backdrop-blur-sm shadow-lg"
                    title="Download Image"
                  >
                    <HiOutlineArrowDownTray className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Text Area */}
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 min-w-[200px]">
                <textarea
                  ref={editInputRef}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-white/50 dark:bg-black/20 text-midnight-950 p-2 rounded-lg text-[15px] resize-none outline-none border border-midnight-950/20 focus:border-midnight-950/50 transition-colors"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEditSubmit(e); }
                    if (e.key === 'Escape') { setIsEditing(false); setEditValue(message.text); }
                  }}
                />
                <div className="flex justify-end gap-1.5">
                  <button type="button" onClick={() => { setIsEditing(false); setEditValue(message.text); }} className="p-1 rounded-md hover:bg-black/10 text-midnight-950 transition-colors">
                    <HiOutlineXMark className="w-4 h-4" />
                  </button>
                  <button type="submit" disabled={!editValue.trim() || editValue === message.text} className="p-1 rounded-md bg-midnight-950/10 hover:bg-midnight-950/20 text-midnight-950 disabled:opacity-50 transition-colors">
                    <HiCheck className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              message.text && (
                <p
                  className={`whitespace-pre-wrap break-words text-[15px] leading-relaxed font-medium ${
                    isWhisper && !isOwn && !whisperRevealed ? 'whisper-blur bg-midnight-900/10 text-transparent rounded px-2' : ''
                  } ${isWhisper && !isOwn && whisperRevealed ? 'animate-reveal' : ''}`}
                  onClick={() => isWhisper && !whisperRevealed && setWhisperRevealed(true)}
                >
                  {message.text}
                </p>
              )
            )}

            {/* Timestamp + read status */}
            <div className={`flex items-center gap-1.5 justify-end mt-1.5 ${isOwn ? 'text-midnight-950/70' : 'text-midnight-400 dark:text-midnight-500'}`}>
              {message.isEdited && <span className="text-[10px] font-semibold tracking-wide uppercase italic mr-1">Edited</span>}
              <span className="text-[10px] font-bold tabular-nums tracking-wide">{formatMessageTime(message.createdAt)}</span>
              {isOwn && (
                <div className="flex -space-x-1.5">
                  <HiCheck className={`w-3.5 h-3.5 ${message.seen ? 'text-midnight-950' : 'text-midnight-950/40'}`} />
                  <HiCheck className={`w-3.5 h-3.5 ${message.seen ? 'text-midnight-950' : 'text-midnight-950/40'}`} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
