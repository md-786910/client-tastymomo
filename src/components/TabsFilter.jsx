const TabsFilter = ({ selectedTab, onTabChange }) => {
  return (
    <div className="p-4">
      <div className="tabs-container">
        <button 
          className={`tab ${selectedTab === 'all' ? 'active' : ''}`}
          onClick={() => onTabChange('all')}
        >
          All
        </button>
        <button 
          className={`tab ${selectedTab === 'steam' ? 'active' : ''}`}
          onClick={() => onTabChange('steam')}
        >
          Steam
        </button>
        <button 
          className={`tab ${selectedTab === 'fry' ? 'active' : ''}`}
          onClick={() => onTabChange('fry')}
        >
          Fried
        </button>
        <button 
          className={`tab ${selectedTab === 'kurkure' ? 'active' : ''}`}
          onClick={() => onTabChange('kurkure')}
        >
          Kurkure
        </button>
      </div>
    </div>
  );
};

export default TabsFilter;