import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import os
import shutil
import threading
import win32com.client
import pythoncom
import re
from ttkthemes import ThemedTk

class RecycleBinRecoveryApp:
    def __init__(self, root):
        self.root = root
        self.selected_folder = None
        self.restore_location = None
        self.scan_in_progress = False
        self.setup_com()
        self.setup_gui()
        self.setup_styles()

    def setup_com(self):
        pythoncom.CoInitialize()

    def setup_styles(self):
        self.style = ttk.Style()
        self.style.configure("TButton", 
                           padding=10, 
                           font=('Segoe UI', 11, 'bold'),
                           background="#4CAF50",
                           foreground="white",
                           borderwidth=0)
        self.style.map("TButton", background=[('active', '#45a049')])
        
        self.style.configure("Treeview",
                           background="#3d3d3d",
                           foreground="white",
                           rowheight=30,
                           fieldbackground="#3d3d3d")
        self.style.map("Treeview",
                     background=[('selected', '#558B2F')],
                     foreground=[('selected', 'white')])
        
        self.style.configure("Treeview.Heading",
                           background="#2E7D32",
                           foreground="white",
                           font=('Segoe UI', 11, 'bold'),
                           padding=8)
        
        self.style.configure("TProgressbar",
                           troughcolor="#444",
                           background="#4CAF50",
                           bordercolor="#2d2d2d",
                           thickness=4)

    def setup_gui(self):
        self.root.title("Recycle Bin Recovery Pro")
        self.root.geometry("1200x800")
        self.root.configure(bg="#2d2d2d")

        # Header
        header = ttk.Frame(self.root)
        header.pack(fill='x', pady=15)
        ttk.Label(header, text="Recycle Bin Recovery Pro", 
                 font=('Segoe UI', 16, 'bold')).pack(side='left', padx=20)

        # Controls
        controls = ttk.Frame(self.root)
        controls.pack(fill='x', padx=20, pady=10)
        
        self.folder_btn = ttk.Button(controls, text="📁 Select Folder", command=self.select_folder)
        self.folder_btn.pack(side='left', padx=5)
        self.create_tooltip(self.folder_btn, "Select folder to scan for deleted files")
        
        self.restore_btn = ttk.Button(controls, text="📂 Restore Location", command=self.select_restore)
        self.restore_btn.pack(side='left', padx=5)
        self.create_tooltip(self.restore_btn, "Choose where to restore files")
        
        scan_btn_frame = ttk.Frame(controls)
        scan_btn_frame.pack(side='right', padx=5)
        
        self.fast_scan_btn = ttk.Button(scan_btn_frame, text="⚡ Quick Scan", 
                                      command=lambda: self.scan_recycle_bin("Quick"))
        self.fast_scan_btn.pack(side='left', padx=2)
        self.deep_scan_btn = ttk.Button(scan_btn_frame, text="🔍 Deep Scan", 
                                      command=lambda: self.scan_recycle_bin("Deep"))
        self.deep_scan_btn.pack(side='right', padx=2)

        # Status
        status_frame = ttk.Frame(self.root)
        status_frame.pack(fill='x', padx=20)
        
        self.folder_label = ttk.Label(status_frame, text="No folder selected", width=40, anchor='w')
        self.folder_label.pack(side='left', padx=5)
        
        self.restore_label = ttk.Label(status_frame, text="No restore location", width=40, anchor='e')
        self.restore_label.pack(side='right', padx=5)
        
        self.progress_bar = ttk.Progressbar(self.root, mode='indeterminate')
        self.progress_bar.pack(fill='x', padx=20, pady=5)
        
        self.status_label = ttk.Label(self.root, text="", anchor='w')
        self.status_label.pack(fill='x', padx=20, pady=5)

        # File List
        tree_frame = ttk.Frame(self.root)
        tree_frame.pack(fill='both', expand=True, padx=20, pady=10)
        
        self.deleted_files_list = ttk.Treeview(tree_frame, columns=("File", "Path"), show='headings')
        self.deleted_files_list.heading("File", text="File Name")
        self.deleted_files_list.heading("Path", text="Original Location")
        self.deleted_files_list.column("File", width=300)
        self.deleted_files_list.column("Path", width=800)
        self.deleted_files_list.pack(side='left', fill='both', expand=True)
        
        scrollbar = ttk.Scrollbar(tree_frame, orient='vertical', command=self.deleted_files_list.yview)
        scrollbar.pack(side='right', fill='y')
        self.deleted_files_list.config(yscrollcommand=scrollbar.set)

        # Footer
        footer = ttk.Frame(self.root)
        footer.pack(fill='x', padx=20, pady=10)
        
        self.restore_btn_footer = ttk.Button(footer, text="Restore Selected File", command=self.restore_file)
        self.restore_btn_footer.pack(side='right', padx=5)
        self.create_tooltip(self.restore_btn_footer, "Restore selected file to chosen location")

    def sanitize_filename(self, filename):
        return re.sub(r'[<>:"|?*]', '', filename).strip()

    def normalize_path(self, path):
        return os.path.normcase(os.path.normpath(path)).rstrip(os.sep)

    def scan_recycle_bin(self, scan_type):
        if self.scan_in_progress:
            messagebox.showwarning("Warning", "A scan is already in progress")
            return
        if not self.selected_folder:
            messagebox.showwarning("Warning", "Please select a folder first")
            return

        self.scan_in_progress = True
        self.toggle_scan_buttons(False)
        self.deleted_files_list.delete(*self.deleted_files_list.get_children())
        self.progress_bar.start()
        self.status_label.config(text=f"Performing {scan_type} Scan...")

        target_path = self.normalize_path(os.path.abspath(self.selected_folder))
        
        threading.Thread(
            target=self._scan_worker,
            args=(scan_type, target_path),
            daemon=True
        ).start()

    def _scan_worker(self, scan_type, target_path):
        try:
            pythoncom.CoInitialize()
            shell = win32com.client.Dispatch("Shell.Application")
            recycle_bin = shell.Namespace(10)
            found_files = []

            for item in recycle_bin.Items():
                try:
                    original_path = None
                    file_name = self.sanitize_filename(item.Name)

                    if scan_type == "Deep":
                        original_dir = item.ExtendedProperty("System.Recycle.DeletedFrom")
                        if original_dir:
                            original_path = os.path.join(original_dir, file_name)
                        
                        if not original_path:
                            original_path = item.ExtendedProperty("System.ItemPathDisplay")
                        
                        if not original_path:
                            original_path = item.Path
                    else:
                        original_path = item.Path

                    if not original_path:
                        continue

                    # Normalize paths
                    norm_original = self.normalize_path(original_path)
                    norm_target = target_path

                    # Check drive compatibility
                    original_drive = os.path.splitdrive(norm_original)[0].lower()
                    target_drive = os.path.splitdrive(norm_target)[0].lower()
                    
                    if original_drive != target_drive:
                        continue  # Skip different drives

                    # Check path containment
                    if norm_original.startswith(norm_target):
                        found_files.append((file_name, original_path))

                except Exception as e:
                    if "same drive" not in str(e):
                        print(f"Error processing item: {str(e)}")
                    continue

            self.root.after(0, lambda: self.populate_results(found_files, scan_type))
        except Exception as e:
            self.root.after(0, lambda: messagebox.showerror("Error", f"Scan failed: {str(e)}"))
        finally:
            pythoncom.CoUninitialize()
            self.scan_in_progress = False
            self.toggle_scan_buttons(True)
            self.progress_bar.stop()
            self.status_label.config(text="")

    def populate_results(self, files, scan_type):
        for idx, file in enumerate(files):
            if idx % 100 == 0:
                self.root.update_idletasks()
            self.deleted_files_list.insert("", "end", values=file)
        self.status_label.config(text=f"{scan_type} Scan Found {len(files)} recoverable files")

    def toggle_scan_buttons(self, state):
        state = "normal" if state else "disabled"
        self.fast_scan_btn.config(state=state)
        self.deep_scan_btn.config(state=state)

    def restore_file(self):
        selected = self.deleted_files_list.selection()
        if not selected:
            messagebox.showwarning("Warning", "Select a file to restore")
            return

        filename, original_path = self.deleted_files_list.item(selected[0], "values")
        restore_dir = self.restore_location or os.path.dirname(original_path)

        if not os.path.exists(restore_dir):
            messagebox.showwarning("Warning", "Restore location does not exist")
            return

        def restore_worker():
            try:
                pythoncom.CoInitialize()
                shell = win32com.client.Dispatch("Shell.Application")
                folder = shell.Namespace(10)
                
                for item in folder.Items():
                    item_path = item.ExtendedProperty("System.ItemPathDisplay")
                    if item_path and self.normalize_path(item_path) == self.normalize_path(original_path):
                        item.InvokeVerb("undelete")
                        break

                src_path = self.normalize_path(original_path)
                dest_path = os.path.join(restore_dir, filename)
                
                if os.path.exists(src_path) and \
                   self.normalize_path(os.path.dirname(src_path)) != self.normalize_path(restore_dir):
                    shutil.move(src_path, dest_path)
                
                self.root.after(0, lambda: messagebox.showinfo("Success", f"Restored: {filename}"))
            except Exception as e:
                self.root.after(0, lambda: messagebox.showerror("Error", f"Restore failed: {str(e)}"))
            finally:
                pythoncom.CoUninitialize()

        threading.Thread(target=restore_worker, daemon=True).start()

    def select_folder(self):
        path = filedialog.askdirectory()
        if path:
            self.selected_folder = path
            display_path = os.path.abspath(path)
            shortened = f"{display_path[:60]}..." if len(display_path) > 60 else display_path
            self.folder_label.config(text=f"Scan: {shortened}")

    def select_restore(self):
        path = filedialog.askdirectory()
        if path:
            self.restore_location = path
            display_path = os.path.abspath(path)
            shortened = f"{display_path[:60]}..." if len(display_path) > 60 else display_path
            self.restore_label.config(text=f"Restore to: {shortened}")

    class ToolTip:
        def __init__(self, widget):
            self.widget = widget
            self.tipwindow = None
            self.x = self.y = 0

        def showtip(self, text):
            self.text = text
            if self.tipwindow or not self.text:
                return
            x, y, _, _ = self.widget.bbox("insert")
            x = x + self.widget.winfo_rootx() + 25
            y = y + self.widget.winfo_rooty() + 25
            self.tipwindow = tw = tk.Toplevel(self.widget)
            tw.wm_overrideredirect(1)
            tw.wm_geometry(f"+{x}+{y}")
            label = ttk.Label(tw, text=self.text, background="#ffffe0", 
                           relief='solid', borderwidth=1,
                           font=('Segoe UI', 9))
            label.pack(ipadx=1)

        def hidetip(self):
            tw = self.tipwindow
            self.tipwindow = None
            if tw:
                tw.destroy()

    def create_tooltip(self, widget, text):
        tool_tip = self.ToolTip(widget)
        widget.bind('<Enter>', lambda e: tool_tip.showtip(text))
        widget.bind('<Leave>', lambda e: tool_tip.hidetip())

    def __del__(self):
        pythoncom.CoUninitialize()

if __name__ == "__main__":
    root = ThemedTk(theme="equilux")
    app = RecycleBinRecoveryApp(root)
    root.mainloop()