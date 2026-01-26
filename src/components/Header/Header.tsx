interface HeaderProps {
    categoryName?: string | null;
}

export const Header = ({ categoryName }: HeaderProps) => {
    return (
        <header className="py-8 mb-4">
            <h1 className="text-4xl font-light text-black">{categoryName || 'Loading...'}</h1>
        </header>
    );
};
