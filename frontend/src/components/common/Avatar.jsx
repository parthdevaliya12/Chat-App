import { getInitials } from '../../lib/utils';

const sizeMap = {
  sm: 'w-9 h-9 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-24 h-24 text-3xl'
};

const statusSizeMap = {
  sm: 'w-2.5 h-2.5 ring-[2px]',
  md: 'w-3 h-3 ring-2',
  lg: 'w-3.5 h-3.5 ring-2',
  xl: 'w-4 h-4 ring-[3px]'
};

export default function Avatar({ src, name = '', size = 'md', showStatus = false, isOnline = false }) {
  return (
    <div className="relative inline-flex flex-shrink-0">
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`${sizeMap[size]} rounded-full object-cover ring-2 ring-white dark:ring-[#12122A] shadow-sm`}
        />
      ) : (
        <div className={`${sizeMap[size]} rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold ring-2 ring-white dark:ring-[#12122A] shadow-sm`}>
          {getInitials(name)}
        </div>
      )}
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ${statusSizeMap[size]} ring-white dark:ring-[#12122A] ${
            isOnline ? 'bg-emerald-500' : 'bg-gray-400'
          }`}
        />
      )}
    </div>
  );
}
