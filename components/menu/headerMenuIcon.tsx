import { Menu, useTheme, MenuProps } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
   FontAwesomeIconMenu,
   IconMenuItem,
   MaterialCommunityIconMenu,
   MaterialIconMenu,
} from '../../library/@types/params';
import useHighlightedPress from '../../library/hooks/useHighlightedPress';

// TODO: rewrite this component so the logic can be separated

type MenuItems = IconMenuItem | string;
export interface HeaderMenuIconProps {
   menuItems: MenuItems[];
   onMenuPress: (menuItem: IconMenuItem | string) => void;
   headerIcon: 'dots-three-vertical' | 'plus';
   iconSize?: number;
   color?: string;
   highlighterColor?: string;
   iconStyle?: StyleProp<ViewStyle>;
   favoriteIcon?: 'star' | 'star-o';
   menuStyle?: StyleProp<ViewStyle>;
   contentStyle?: MenuProps['contentStyle'];
}

const HeaderMenuIcon = ({
   menuItems,
   onMenuPress,
   headerIcon,
   iconSize = 16,
   color,
   favoriteIcon,
   highlighterColor,
   iconStyle,
   contentStyle,
   menuStyle,
}: HeaderMenuIconProps) => {
   const { colors } = useTheme();
   const [visible, setVisible] = useState(false);
   const [menuSize, setMenuSize] = useState({ width: 0, height: 0 });

   const layoutRef = useRef<TouchableOpacity | null>(null);

   const getColor = !color ? colors.onSurface : color;

   const { containerStyle, handlePressIn, handlePressOut, pressed } = useHighlightedPress({
      size: iconSize + 10,
      highlighterColor,
   });

   const onLayout = () => {
      layoutRef.current?.measure((width, height) => {
         console.log('width');
         setMenuSize({ width, height });
      });
   };

   const handleMenuPressItem = <T extends IconMenuItem | string>(menuItem: T) => {
      onMenuPress(menuItem);

      setTimeout(() => {
         setVisible(false);
      }, 100);
   };

   const renderMenuItem = (item: MenuItems, _index: number) => {
      if (typeof item === 'string') {
         return <Menu.Item key={item} onPress={() => handleMenuPressItem(item)} title={item} />;
      } else {
         return (
            <View
               testID='menu-with-icons'
               key={item.title}
               style={[menuStyle, styles.menuContainer]}
            >
               {item.library === 'FontAwesome' && (
                  <FontAwesome
                     name={
                        item.title === 'Favorite'
                           ? favoriteIcon
                           : (item.icon as FontAwesomeIconMenu)
                     }
                     size={iconSize}
                     color={
                        item.title === 'Favorite' && favoriteIcon === 'star' ? getColor : getColor
                     }
                     style={styles.menuIcon}
                  />
               )}
               {item.library === 'MaterialCommunityIcons' && (
                  <MaterialCommunityIcons
                     name={item.icon as MaterialCommunityIconMenu}
                     size={iconSize}
                     color={getColor}
                     style={styles.menuIcon}
                  />
               )}
               {item.library === 'MaterialIcons' && (
                  <MaterialIcons
                     name={item.icon as MaterialIconMenu}
                     size={iconSize}
                     color={getColor}
                     style={styles.menuIcon}
                  />
               )}
               <Menu.Item
                  key={item.title}
                  onPress={() => handleMenuPressItem(item)}
                  title={item.title}
                  style={[styles.menuItem]}
               />
            </View>
         );
      }
   };

   return (
      <View style={[containerStyle]}>
         <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentStyle={[contentStyle, { zIndex: 5000 }]}
            anchorPosition='bottom'
            anchor={
               <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setVisible(true)}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  ref={layoutRef}
                  onLayout={onLayout}
                  style={[
                     iconStyle,
                     {
                        alignSelf: 'center',
                        alignContent: 'center',
                     },
                  ]}
               >
                  <Entypo name={headerIcon} size={iconSize} color={getColor} />
               </TouchableOpacity>
            }
         >
            {visible && <>{menuItems.map(renderMenuItem)}</>}
         </Menu>
      </View>
   );
};

const styles = StyleSheet.create({
   menuContainer: {
      marginTop: -3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   menuIcon: {
      position: 'absolute',
      left: '3.5%',
   },
   menuItem: {
      position: 'relative',
      flexGrow: 1,
      width: '55%',
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default HeaderMenuIcon;
