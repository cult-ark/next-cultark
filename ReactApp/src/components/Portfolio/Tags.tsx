import { cx } from 'class-variance-authority';

const Tags = ({
  tags,
  className,
}: {
  tags: { term_id: string | number; name: string }[];
  className?: string;
}) => {
  return (
    <div className={cx('flex gap-1.5 flex-wrap text-[1.1rem]', className)}>
      {tags.map((tag) => (
        <div
          className='bg-gray-400 text-white px-3 py-1 rounded-lg'
          key={tag.term_id}
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
};

export default Tags;
