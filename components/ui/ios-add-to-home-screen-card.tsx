import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

export function IOSAddToHomeScreenCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="whitespace-nowrap bg-secondary text-primary px-4 py-2 rounded shadow hover:bg-secondary/80 text-sm font-medium ">
          How to?
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Home Screen</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <img
            src="/icons/web-app-manifest-192x192.png"
            alt="App Icon"
            className="w-12 h-12 rounded self-center mb-2"
          />
          <h2 className="text-lg font-bold mb-2 text-center">Install this app on your iPhone</h2>
          <ol className="list-decimal list-inside text-sm space-y-2">
            <li>Tap the <span className="inline-block align-middle"><svg className="inline w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="12" width="16" height="8" rx="2" /><path d="M12 16V4" /><path d="M8 8l4-4 4 4" /></svg></span> Share button in your browser.</li>
            <li>Scroll down and tap <span className="font-semibold">Add to Home Screen</span>.</li>
            <li>Tap <span className="font-semibold">Add</span> in the top right corner.</li>
          </ol>
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Enjoy a better, app-like experience!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
