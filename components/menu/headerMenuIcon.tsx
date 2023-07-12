import { Menu, useTheme, MenuProps } from 'react-native-paper';
import {
   TouchableOpacity,
   Animated,
   StyleSheet,
   ViewStyle,
   StyleProp,
   Easing,
   View,
} from 'react-native';
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
   FontAwesomeIconMenu,
   IconMenuItem,
   MaterialCommunityIconMenu,
   MaterialIconMenu,
} from '../../library/@types/params';

type MenuItems = IconMenuItem | string;
export interface HeaderMenuIconProps {
   menuItems: MenuItems[];
   onMenuPress: (menuItem: IconMenuItem | string) => void;
   headerIcon: 'dots-three-vertical' | 'plus';
   iconSize?: number;
   color?: string;
   iconStyle?: StyleProp<ViewStyle>;
   menuStyle?: StyleProp<ViewStyle>;
   contentStyle?: MenuProps['contentStyle'];
}

const HeaderMenuIcon = ({
   menuItems,
   onMenuPress,
   headerIcon,
   iconSize = 16,
   color,
   iconStyle,
   contentStyle,
   menuStyle,
}: HeaderMenuIconProps) => {
   const { colors } = useTheme();
   const [visible, setVisible] = useState(false);
   const [isPressed, setIsPressed] = useState(false);
   const [_menuSize, setMenuSize] = useState({ width: 0, height: 0 });
   const opacity = useRef(new Animated.Value(0)).current;

   const layoutRef = useRef<TouchableOpacity | null>(null);
   const getColor = !color ? colors.onSurface : color;

   const openMenu = () => {
      setVisible(true);
      Animated.timing(opacity, {
         toValue: 1,
         easing: Easing.inOut(Easing.linear),
         duration: 100,
         useNativeDriver: true,
      }).start();
      setIsPressed(true);
   };

   const closeMenu = () => {
      Animated.timing(opacity, {
         toValue: 0,
         duration: 50,
         useNativeDriver: true,
      }).start(() => {
         setIsPressed(false);
         setVisible(false);
      });
   };

   const onLayout = () => {
      layoutRef.current?.measure((width, height) => {
         setMenuSize({ width, height });
      });
   };

   const handleMenuPressItem = (menuItem: IconMenuItem | string) => {
      onMenuPress(menuItem);

      setTimeout(() => {
         closeMenu();
      }, 100);
   };

   const renderMenuItem = (item: MenuItems, _index: number) => {
      if (typeof item === 'string') {
         return <Menu.Item key={item} onPress={() => handleMenuPressItem(item)} title={item} />;
      } else {
         return (
            <View style={[menuStyle, { flexDirection: 'row', alignItems: 'center' }]}>
               {item.library === 'FontAwesome' && (
                  <FontAwesome
                     name={item.icon as FontAwesomeIconMenu}
                     size={iconSize}
                     color={getColor}
                  />
               )}
               {item.library === 'MaterialCommunityIcons' && (
                  <MaterialCommunityIcons
                     name={item.icon as MaterialCommunityIconMenu}
                     size={iconSize}
                     color={getColor}
                  />
               )}
               {item.library === 'MaterialIcons' && (
                  <MaterialIcons
                     name={item.icon as MaterialIconMenu}
                     size={iconSize}
                     color={getColor}
                  />
               )}
               <Menu.Item
                  key={item.title}
                  onPress={() => handleMenuPressItem(item)}
                  title={item.title}
               />
            </View>
         );
      }
   };

   return (
      <>
         <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={contentStyle}
            anchorPosition='top'
            anchor={
               <TouchableOpacity
                  onLayout={onLayout}
                  onPress={openMenu}
                  ref={layoutRef}
                  style={[
                     iconStyle,
                     styles.pressed,
                     isPressed && { borderColor: colors.onSurface },
                  ]}
               >
                  <Entypo name={headerIcon} size={iconSize} color={getColor} />
               </TouchableOpacity>
            }
         >
            {visible && (
               <Animated.View
                  style={{
                     opacity,
                  }}
               >
                  {menuItems.map(renderMenuItem)}
               </Animated.View>
            )}
         </Menu>
      </>
   );
};

const styles = StyleSheet.create({
   pressed: {
      // borderColor: 'black',
      //   borderRadius: 10,
      //   borderWidth: 0.5,
   },
});

export default HeaderMenuIcon;
