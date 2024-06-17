import { Autocomplete, Box, TextField } from '@mui/material';

export interface DropdownSelectionProps<T> {
    id?: string;
    options: DropdownSelectionOption<T>[];
    label: string;
    onSelected: (value: T | undefined) => void;
}

export interface DropdownSelectionOption<T> {
    label: string;
    value: T;
}
function DropdownSelection<T>({ id, options, label, onSelected }: DropdownSelectionProps<T>) {
    return (
        <Box>
            <Autocomplete
                id={id}
                options={options}
                sx={{
                    minWidth: '210px',
                    margin: '4px',
                }}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_e, option) => onSelected(option?.value ?? undefined)}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </Box>
    );
}

export default DropdownSelection;
