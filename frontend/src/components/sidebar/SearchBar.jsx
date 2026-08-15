import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative group">
      <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-midnight-400 dark:text-midnight-500 group-focus-within:text-azure-500 transition-colors duration-200" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search conversations..."
        className="w-full pl-10 pr-10 py-2.5 bg-pearl-200/50 dark:bg-midnight-800/50 border border-transparent focus:bg-white dark:focus:bg-midnight-900 focus:border-azure-500/30 rounded-xl text-sm outline-none text-midnight-900 dark:text-pearl-50 placeholder-midnight-400 dark:placeholder-midnight-500 transition-all font-medium"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-pearl-300 dark:hover:bg-midnight-700 transition-colors"
        >
          <HiOutlineXMark className="w-4 h-4 text-midnight-500 dark:text-midnight-400" />
        </button>
      )}
    </div>
  );
}
