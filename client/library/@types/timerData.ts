interface BaseUserProps {
   uid: string;
   id: string;
}

export interface BaseUserLogProps extends BaseUserProps {
   logIndex: number;
}

export type AddLogDataType = {
   log: {
      index: {
         low: number;
         high: number;
      };
      isBookmarked?: boolean;
   };
};

export interface TimerParamType extends BaseUserLogProps {
   startTime?: Date | null;
   endTime?: Date | null;
}
