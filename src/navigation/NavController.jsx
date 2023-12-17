import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { isAuth, getRole } from "../authUtils";
import AuthNavigator from './AuthNavigator';
import MabaNavigator from './MabaNavigator';
import VendorNavigator from './VendorNavigator';

const NavController = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const authStatus = await isAuth();
      setAuthenticated(authStatus);

      if (authStatus) {
        const role = await getRole();
        setUserRole(role);
      }
    };

    fetchData();
  }, []);

  if (authenticated) {
    if (userRole === 'ROLE_Maba') {
      return <MabaNavigator />;
    } else if (userRole === 'ROLE_Vendor') {
      return <VendorNavigator />;
    } else {
      return <AuthNavigator />;
    }
  } else {
    return <AuthNavigator />;
  }
};

export default NavController;
