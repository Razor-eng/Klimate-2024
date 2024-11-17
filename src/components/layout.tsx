import { PropsWithChildren } from 'react'
import Header from './Header '
import { Toaster } from './ui/sonner'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='bg-gradient-to-br from-background to-muted flex flex-col min-h-screen max-w-screen overflow-x-hidden'>
            <Header />
            <main className="flex-1 px-4 lg:px-8 py-8">
                {children}
            </main>
            <Toaster richColors />
        </div>
    )
}

export default Layout