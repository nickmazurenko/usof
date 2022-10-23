import { HiChartPie } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';

const SidebarComponent = () => {
  return (
    <div className='w-fit h-screen'>
      <Sidebar aria-label='Sidebar with multi-level dropdown example'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href='#' icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiChartPie} label='E-commerce'>
              <Sidebar.Item href='#'>Products</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href='#' icon={HiChartPie}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href='#' icon={HiChartPie}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href='#' icon={HiChartPie}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href='#' icon={HiChartPie}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href='#' icon={HiChartPie}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
