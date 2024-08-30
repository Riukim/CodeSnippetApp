import TagSwiper from "../(protected)/my-snippets/components/TagsArea/TagSwiper"
import SidebarWrapper from "./components/SidebarWrapper"
import TopBar from "./components/TopBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {

  return (
    <>
      <main className="bg-secondary flex flex-col lg:flex-row min-h-screen h-fill w-full">
        <SidebarWrapper />
        <div className="px-5 flex-grow">
          <TopBar />
          <TagSwiper />
          {children}
        </div>
      </main>
    </>
  )
}
