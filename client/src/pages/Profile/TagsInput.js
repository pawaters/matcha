import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	TextField, Autocomplete, Chip,
} from '@mui/material'
import Loader from '../Loader'
import browsingService from '../../services/browsingService'

export const TagsInput = ({ tags, setTags, formerTags }) => {
	const [menuTags, setMenuTags] = useState([])
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		const getTags = async () => {
			const allTags = await browsingService.getAllTags()
			setMenuTags(allTags)
			setLoading(false)
		}
		getTags()
	}, [])

	if (isLoading) {
		return <Loader text="Getting user tags..." />
	}

	const handleTagFilter = (value) => {
		setTags(value)
	}

	return (
		<>
			<Autocomplete
				multiple
				id="tags-filled"
				options={menuTags.map((tag) => tag.tag_content)} //mandatory prop 1/2
				onChange={(event, newValue) => handleTagFilter(newValue)}
				onInputChange={(event, newValue) => setInputValue(newValue)}
				defaultValue={formerTags}
				inputValue={inputValue}
				freeSolo
                //mandatory prop 2/2
				renderTags={(tags, getTagProps) =>
					tags.map((tag, index) => (
					  <Chip variant="outlined" label={tag} {...getTagProps({ index })} />
					))
				} 
				renderInput={(params) => (
					<TextField
						{...params}
						variant="filled"
						label="Tags"
						placeholder="Tags"
					/>
				)}
			/>
		</>
	)
}
