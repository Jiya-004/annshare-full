import React from 'react';
import {
  FiCoffee,
  FiGift,
  FiSun,
  FiFeather,
  FiBox,
  FiDroplet,
  FiGrid,
  FiPackage
} from 'react-icons/fi';

const iconMap = {
  cooked: FiCoffee,
  "prepared meals": FiCoffee,
  bakery: FiGift,
  "bakery & bread": FiGift,
  fruits: FiSun,
  vegetables: FiFeather,
  "fruits & veggies": FiSun,
  packaged: FiBox,
  "packaged food": FiBox,
  grains: FiPackage,
  "rice & grains": FiPackage,
  dairy: FiDroplet,
  "dairy & pantry": FiDroplet,
  other: FiGrid,
  "other items": FiGrid
};

const CategoryIcon = ({ icon, size = 18, className, style }) => {
  const IconComponent = iconMap[icon?.toLowerCase()] || iconMap[icon] || FiPackage;
  return <IconComponent size={size} className={className} style={{ color: '#1B4D3E', ...style }} />;
};

export default CategoryIcon;
