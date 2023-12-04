import { StoreProps } from '../../types/@types';
import useBoundedStore from '../../store';

export const setCurrentPage = (value: number | null) => {
   useBoundedStore.setState({ currentPage: value });
};

export const setTempPage = (
   value: StoreProps['tempPage'] | ((currentPage: StoreProps['tempPage']) => StoreProps['tempPage'])
) => {
   useBoundedStore.setState((state) => {
      const newPage = typeof value === 'function' ? value(state.tempPage) : value;
      return { tempPage: newPage };
   });
};
