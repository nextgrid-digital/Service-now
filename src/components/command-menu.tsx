import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Laptop, Moon, Sun } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { useTheme } from '@/context/theme-provider'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { ScrollArea } from './ui/scroll-area'

type RoutePath =
  | '/'
  | '/applications'
  | '/profile/builder'
  | '/jobs/post'
  | '/supporter'
  | '/settings/account'
  | '/settings/appearance'
  | '/settings/notifications'

type NavItem = {
  title: string
  url: RoutePath
  description?: string
}

type NavGroup = {
  heading: string
  items: NavItem[]
}

export function CommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()
  const navGroups: NavGroup[] = [
    {
      heading: 'Discover',
      items: [
        { title: 'Home', url: '/' },
        { title: 'My Applications', url: '/applications' },
        { title: 'Profile Builder', url: '/profile/builder' },
        { title: 'Post a Job', url: '/jobs/post' },
      ],
    },
    {
      heading: 'Support & Settings',
      items: [
        { title: 'Supporter Program', url: '/supporter' },
        { title: 'Account Settings', url: '/settings/account' },
        { title: 'Appearance Settings', url: '/settings/appearance' },
        { title: 'Notifications', url: '/settings/notifications' },
      ],
    },
  ]

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <ScrollArea type='hover' className='h-72 pe-1'>
          <CommandEmpty>No results found.</CommandEmpty>
          {navGroups.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map((navItem) => (
                <CommandItem
                  key={navItem.url}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => navigate({ to: navItem.url as any }))
                  }}
                >
                  <div className='flex size-4 items-center justify-center'>
                    <ArrowRight className='text-muted-foreground/80 size-2' />
                  </div>
                  <div className='flex flex-col'>
                    <span>{navItem.title}</span>
                    {navItem.description && (
                      <span className='text-xs text-muted-foreground'>
                        {navItem.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className='scale-90' />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
