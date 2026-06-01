import React from 'react'

const SectionHeader = ({ data }) => {
  return (
    <div className="w-full relative hidden md:block">
      <img
        src={data.banner}
        alt="productBanner"
        className="w-full object-cover object-center aspect-4/3 md:aspect-19/6"
      />
    </div>
  );
}

export default SectionHeader