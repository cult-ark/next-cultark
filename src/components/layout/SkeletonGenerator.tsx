import { Fragment } from 'react/jsx-runtime';

const SkeletonGenerator = ({
    skeleton,
    count = 1,
}: {
    skeleton: JSX.Element | JSX.Element[];
    count: number;
}) => {
    return (
        <Fragment>
            {[...Array(count)].map((_, index) => (
                <Fragment key={index}>{skeleton}</Fragment>
            ))}
        </Fragment>
    );
};

export default SkeletonGenerator;