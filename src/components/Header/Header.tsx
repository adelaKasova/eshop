interface HeaderProps {
    categoryName?: string | null;
}

export const Header = ({ categoryName }: HeaderProps) => {
    return (
        <header className="py-8 mb-4">
            <h1 className="text-4xl font-light text-black">{categoryName !== null ? categoryName : <div className="h-9 bg-gray-200 rounded w-1/3 mb-2" />}</h1>
        </header>
    );
};
