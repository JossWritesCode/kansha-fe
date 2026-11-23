import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Hamburger from './Hamburger';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as ProfileIcon } from '../../assets/profile.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg';
import { ReactComponent as PowerIcon } from '../../assets/signout.svg';
import { ReactComponent as TeamIcon } from '../../assets/workspacenav.svg';
import { ReactComponent as HelpIcon } from '../../assets/HelpModalImgs/Help.svg';
import { SidebarLink } from './SideBarLink';
import { signout } from '../Auth';
import { selectProfile, selectIsAdmin } from '../../store/selectors';

function Sidebar() {
	const [open, setOpen] = useState(false);
	const profile = useSelector(selectProfile);
	const isAdmin = useSelector(selectIsAdmin);

	return (
		<section className={`side-nav${open ? ' is-open' : ''}`}>
			<section className="nav-hamburger" onClick={() => setOpen(!open)}>
				<Hamburger open={open} />
			</section>
			<section className={open ? 'side-nav-profile' : 'hidden'}>
				<img src={profile.profile_picture} alt="User" />
				<p>
					{profile.first_name} {profile.last_name}
				</p>
			</section>
			<nav>
				<SidebarLink
					path="/"
					name="Dashboard"
					icon={HomeIcon}
					open={open}
				/>
				{isAdmin && (
					<>
						<SidebarLink
							path="/organization"
							name="Teams"
							icon={TeamIcon}
							open={open}
						/>
						<SidebarLink
							path="/profile"
							name="Profile"
							icon={ProfileIcon}
							open={open}
							className="fill-white"
						/>
					</>
				)}
				<SidebarLink
					path="/settings"
					name="Settings"
					icon={SettingsIcon}
					open={open}
					className="fill-white"
				/>
				{isAdmin && (
					<SidebarLink
						path="?help"
						name="Get help"
						icon={HelpIcon}
						open={open}
						className="help-btn"
					/>
				)}
			</nav>
			<section className="nav-signout">
				<button type="button" title="Sign Out" onClick={signout}>
					<PowerIcon className="fill-white" />
					{open && <p>Sign Out</p>}
				</button>
			</section>
		</section>
	);
}

export default Sidebar;
