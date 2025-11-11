// import { useState, useEffect, useMemo } from "react";
// import styles from "./ZoneNameDropdown.module.css";
// import Dropdown from "../../../../widgets/Dropdown/Dropdown";
// import {
//   useGetAllZones,
//   useGetAllDgms,
//   useGetAllCampuses,
//   useGetDgmsForZonalAccountant,
//   useGetCampuesForZonalAccountant,
//   useGetCampuesForDgmEmpId,
// } from "../../../../queries/application-analytics/analytics";

// const ZoneNameDropdown = ({ activeTab }) => {
//   const [selectedValue, setSelectedValue] = useState("");
//   const [userCategory, setUserCategory] = useState(null);
//   const [empId, setEmpId] = useState(null);

//   // ✅ Load category & empId safely from localStorage
//   useEffect(() => {
//     const storedCategory = localStorage.getItem("category");
//     const storedEmpId = localStorage.getItem("empId");
//     if (storedCategory) setUserCategory(storedCategory.toUpperCase());
//     if (storedEmpId) setEmpId(storedEmpId);
//   }, []);

//   // ✅ Identify user type
//   const isZonalAccountant =
//     userCategory === "SCHOOL" || userCategory === "COLLEGE";
//   const isAdmin = !!userCategory && !isZonalAccountant;

//   // ✅ Conditionally enable queries
//   const allZonesQuery = useGetAllZones({
//     enabled: !!userCategory && isAdmin && activeTab === "Zone",
//   });

//   const allDgmsQuery = useGetAllDgms({
//     enabled: !!userCategory && isAdmin && activeTab === "DGM",
//   });

//   const allCampusesQuery = useGetAllCampuses({
//     enabled: !!userCategory && isAdmin && activeTab === "Campus",
//   });

//   const dgmsForZonalQuery = useGetDgmsForZonalAccountant(empId, {
//     enabled: !!empId && !!userCategory && isZonalAccountant && activeTab === "DGM",
//   });

//   const campusesForZonalQuery = useGetCampuesForZonalAccountant(empId, {
//     enabled: !!empId && !!userCategory && isZonalAccountant && activeTab === "Campus",
//   });

//   const campusesForDgmQuery = useGetCampuesForDgmEmpId(empId, {
//     enabled: !!empId && !!userCategory && isZonalAccountant && activeTab === "Campus",
//   });

//   // ✅ Choose which data to display dynamically
//   let rawData = [];
//   let isLoading = false;
//   let isError = false;

//   if (isAdmin) {
//     if (activeTab === "Zone")
//       ({ data: rawData = [], isLoading, isError } = allZonesQuery);
//     else if (activeTab === "DGM")
//       ({ data: rawData = [], isLoading, isError } = allDgmsQuery);
//     else if (activeTab === "Campus")
//       ({ data: rawData = [], isLoading, isError } = allCampusesQuery);
//   } else if (isZonalAccountant) {
//     if (activeTab === "DGM")
//       ({ data: rawData = [], isLoading, isError } = dgmsForZonalQuery);
//     else if (activeTab === "Campus") {
//       // 🧩 Fallback: campuses for Zonal first, else for DGM
//       const zonalData = campusesForZonalQuery.data || [];
//       const dgmData = campusesForDgmQuery.data || [];
//       rawData =
//         Array.isArray(zonalData) && zonalData.length > 0 ? zonalData : dgmData;

//       isLoading =
//         campusesForZonalQuery.isLoading || campusesForDgmQuery.isLoading;
//       isError =
//         campusesForZonalQuery.isError && campusesForDgmQuery.isError;
//     }
//   }

//   // ✅ Map raw data (common format: { id, name })
//   const dropdownResults = useMemo(() => {
//     if (!Array.isArray(rawData) || rawData.length === 0) return [];
//     return rawData.map((item) => item.name).filter(Boolean);
//   }, [rawData]);

//   // ✅ Reset value when tab or data changes
//   useEffect(() => {
//     if (!isLoading) setSelectedValue("");
//   }, [activeTab, isLoading]);

//   const handleChange = (event) => {
//     const newValue = event.target?.value || event;
//     setSelectedValue(newValue);
//   };

//   const dropdownName = activeTab ? `${activeTab} Name` : "Select Category";
//   const isDisabled =
//     isLoading || isError || dropdownResults.length === 0;

//   // 🧠 Prevent rendering until both category & empId are ready
//   if (!userCategory || !empId) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div id="zone_name_dropdown">
//       <Dropdown
//         dropdownname={dropdownName}
//         results={dropdownResults}
//         onChange={handleChange}
//         value={selectedValue}
//         name={activeTab.toLowerCase() + "Name"}
//         disabled={isDisabled}
//       />
//     </div>
//   );
// };

// export default ZoneNameDropdown;




import { useState, useEffect, useMemo } from "react";
import styles from "./ZoneNameDropdown.module.css";
import Dropdown from "../../../../widgets/Dropdown/Dropdown";
import {
  useGetAllDgms,
  useGetAllCampuses,
  useGetDgmsForZonalAccountant,
  useGetCampuesForZonalAccountant,
  useGetCampuesForDgmEmpId,
} from "../../../../queries/application-analytics/analytics";

import { useZonesQuery, useCampusesQuery, useDgmsQuery } from "./DropdownData";

const ZoneNameDropdown = ({ activeTab }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [userCategory, setUserCategory] = useState(null);
  const [empId, setEmpId] = useState(null);

  // ✅ Load category & empId safely from localStorage
  useEffect(() => {
    const storedCategory = localStorage.getItem("category");
    const storedEmpId = localStorage.getItem("empId");
    if (storedCategory) setUserCategory(storedCategory.toUpperCase());
    if (storedEmpId) setEmpId(storedEmpId);
  }, []);

  // ✅ Identify user type
  const isZonalAccountant =
    userCategory === "SCHOOL" || userCategory === "COLLEGE";
  const isAdmin = !!userCategory && !isZonalAccountant;

  // ✅ Use our new zones query hook - enabled for both admin and zonal accountant
  const allZonesQuery = useZonesQuery({
    enabled: !!userCategory && activeTab === "Zone", // Remove isAdmin check to allow all users
  });
  console.log('useZonesQuery enabled:', !!userCategory && activeTab === 'Zone');

  const allDgmsQuery = useGetAllDgms({
    enabled: !!userCategory && isAdmin && activeTab === "DGM",
  });
  console.log('useGetAllDgms enabled:', !!userCategory && isAdmin && activeTab === 'DGM');

  const allCampusesQuery = useCampusesQuery({
    enabled: !!userCategory && activeTab === "Campus", // Enable for all users
  });
  console.log('useCampusesQuery enabled:', !!userCategory && activeTab === 'Campus');

  const dgmsForZonalQuery = useGetDgmsForZonalAccountant(empId, {
    enabled: !!empId && !!userCategory && isZonalAccountant && activeTab === "DGM",
  });
  console.log('dgmsForZonalQuery enabled:', !!empId && !!userCategory && isZonalAccountant && activeTab === 'DGM');

  const campusesForZonalQuery = useGetCampuesForZonalAccountant(empId, {
    enabled: !!empId && !!userCategory && isZonalAccountant && activeTab === "Campus",
  });
  console.log('campusesForZonalQuery enabled:', !!empId && !!userCategory && isZonalAccountant && activeTab === 'Campus');

  const campusesForDgmQuery = useGetCampuesForDgmEmpId(empId, {
    enabled: !!empId && !!userCategory && isZonalAccountant && activeTab === "Campus",
  });
  console.log('campusesForDgmQuery enabled:', !!empId && !!userCategory && isZonalAccountant && activeTab === 'Campus');

  // Call useDgmsQuery at the top level
  const dgmsQuery = useDgmsQuery();

  // ✅ Choose which data to display dynamically
  let rawData = [];
  let isLoading = false;
  let isError = false;

  // Handle zones for all users, other data based on user type
  if (activeTab === "Zone") {
    ({ data: rawData = [], isLoading, isError } = allZonesQuery);
  } else if (activeTab === "DGM") {
    // For DGM tab, use the DGM query (which returns static data)
    ({ data: rawData = [], isLoading, isError } = dgmsQuery);
  } else if (activeTab === "Campus") {
    // Use campus API data for Campus tab
    ({ data: rawData = [], isLoading, isError } = allCampusesQuery);
  } else if (isZonalAccountant) {
    if (activeTab === "DGM")
      ({ data: rawData = [], isLoading, isError } = dgmsForZonalQuery);
    else if (activeTab === "Campus") {
      // 🧩 For zonal-accountant campus view: prefer zonal campuses, then DGM campuses,
      // then the global campuses list (allCampusesQuery) as a fallback.
      const zonalData = campusesForZonalQuery.data || [];
      const dgmData = campusesForDgmQuery.data || [];
      const allCampusData = allCampusesQuery.data || [];

      if (Array.isArray(zonalData) && zonalData.length > 0) {
        rawData = zonalData;
      } else if (Array.isArray(dgmData) && dgmData.length > 0) {
        rawData = dgmData;
      } else {
        rawData = allCampusData;
      }

      // Aggregate loading/error states across the three sources
      isLoading =
        (campusesForZonalQuery?.isLoading || false) ||
        (campusesForDgmQuery?.isLoading || false) ||
        (allCampusesQuery?.isLoading || false);

      isError =
        (campusesForZonalQuery?.isError || false) &&
        (campusesForDgmQuery?.isError || false) &&
        (allCampusesQuery?.isError || false);
    }
  }

  // Use backend data only for Campus tab when no data is available
  if (!rawData || rawData.length === 0) {
    if (activeTab === "Campus") {
      console.log('No campus data available from primary source');
    }
  }

  // ✅ Map raw data (common format: { id, name })
  const dropdownResults = useMemo(() => {
    // console.log('Raw data received:', rawData); // Debug log for raw data
    
    if (!Array.isArray(rawData)) {
      console.log('Data is not an array:', rawData);
      return [];
    }

    if (rawData.length === 0) {
      // console.log('Data array is empty');
      return [];
    }
    
    // Map the data to dropdown format
    const results = rawData
      .filter(item => item && (item.name || item.zoneName || item.zone_name || item.zone)) // Make sure item exists and has a name
      .map(item => {
        const zoneName = item.name || item.zoneName || item.zone_name || item.zone;
        // console.log('Processing zone:', { original: item, extracted: zoneName });
        return zoneName;
      });
    
    // console.log('Final dropdown options:', results);
    return results;
  }, [rawData]);

  // ✅ Reset value when tab or data changes
  useEffect(() => {
    if (!isLoading) setSelectedValue("");
  }, [activeTab, isLoading]);

  const handleChange = (event) => {
    const newValue = event.target?.value || event;
    setSelectedValue(newValue);
  };

  const dropdownName = activeTab ? `${activeTab} Name` : "Select Category";
  
  // Debug logs to understand the state
  console.log('Dropdown State:', {
    isLoading,
    isError,
    resultsLength: dropdownResults.length,
    rawData,
    userCategory,
    isAdmin,
    activeTab,
    hasData: dropdownResults.length > 0
  });

  // Only disable if loading or error, allow opening even if empty
  const isDisabled = isLoading || isError;

  // 🧠 Prevent rendering until required values are ready
  if (!userCategory || !empId) {
    return <div>Loading...</div>;
  }

  return (
    <div id="zone_name_dropdown">
      <Dropdown
        dropdownname={dropdownName}
        results={dropdownResults}
        onChange={handleChange}
        value={selectedValue}
        name={activeTab.toLowerCase() + "Name"}
        disabled={isDisabled}
      />
    </div>
  );
};

export default ZoneNameDropdown;
