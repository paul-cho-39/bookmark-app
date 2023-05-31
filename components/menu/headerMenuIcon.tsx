import { Menu, useTheme, MenuProps } from 'react-native-paper';
import { TouchableOpacity, Animated, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useRef, useState } from 'react';

export interface HeaderMenuIconProps {
   menuItems: string[];
   onMenuPress: (menuItem?: HeaderMenuIconProps['menuItems'][number]) => void;
   headerIcon: 'dots-three-vertical' | 'plus';
   iconSize?: number;
   color?: string;
   iconStyle?: StyleProp<ViewStyle>;
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
}: HeaderMenuIconProps) => {
   const { colors } = useTheme();
   const [visible, setVisible] = useState(false);
   const [isPressed, setIsPressed] = useState(false);
   const [_menuSize, setMenuSize] = useState({ width: 0, height: 0 });
   const opacity = useRef(new Animated.Value(0)).current;
   const layoutRef = useRef<TouchableOpacity | null>(null);
   const getColor = !color ? colors.onSurface : color;

   // if animation needed to be changed
   // use a hook for animation effect that returns a different animation
   // and pass the props to which animation effect will be returned
   // but generally, there is no need for animation when opening a menu
   const openMenu = () => {
      setVisible(true);
      Animated.timing(opacity, {
         toValue: 1,
         easing: () => 500,
         delay: 50,
         duration: 400,
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

   const handleMenuPressItem = (menuItem?: (typeof menuItems)[number]) => {
      if (!menuItem) {
         onMenuPress();
      }
      onMenuPress(menuItem);

      setTimeout(() => {
         closeMenu();
      }, 100);

      // clearTimeout(timerId);
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
                  {menuItems.map((item) => (
                     <Menu.Item key={item} onPress={() => handleMenuPressItem(item)} title={item} />
                  ))}
               </Animated.View>
            )}
         </Menu>
      </>
   );
};

const styles = StyleSheet.create({
   // creates border to notify that it has been pressed
   // dont think this is necessary(?)
   pressed: {
      // borderColor: 'black',
      //   borderRadius: 10,
      //   borderWidth: 0.5,
   },
});

export default HeaderMenuIcon;
