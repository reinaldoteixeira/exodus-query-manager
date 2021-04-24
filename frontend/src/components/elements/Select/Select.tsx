import ReactSelect, { OptionTypeBase } from 'react-select';
import mainTheme from '../../../styles/theme';

interface SelectProps extends OptionTypeBase {
  isInvalid?: boolean;
}

const Select: React.FC<SelectProps> = ({
  isInvalid,
  ...props
}) => (
  <ReactSelect
    theme={theme => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: mainTheme.colors.primary,
      }
    })}
    styles={{
      control: (base) => {
        if (!isInvalid) {
          return base;
        }
        return {
          ...base,
          borderColor: mainTheme.colors.danger,
        };
      }
    }}
    {...props}
  />
);

export default Select;
