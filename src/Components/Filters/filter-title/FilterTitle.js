const FilterTitle = ({ className = "", children, handleOpenClick }) => {
  return (
    <div
      className={`pr-5 pl-5 pb-0 pt-3 cursor-pointer`}
      onClick={handleOpenClick}
    >
      <h4 className={`font-medium text-lg ${className} `}>{children}</h4>
    </div>
  );
};

export default FilterTitle;
