# ANON Credential Hub (simple edition)

A certificate verification site for ANON Global Foundation that runs entirely on free GitHub Pages.
No database, no server, nothing to install on your laptop.

## What is in this folder

| File | What it is |
|---|---|
| `index.html` | The public page. People type a certificate ID or scan a QR code and see the result. |
| `admin.html` | Your page. Fill in a form, get an ID, a link, a QR code and a small record file. |
| `data/` | The register. One small file per certificate, named after its ID. |
| `certs/` | Optional. Finished certificate images, named after the ID, shown on the public page. |
| `assets/config.js` | Organisation name, categories and wording. The only file to edit for changes. |
| `assets/logo.png` | Your logo, shown in the header. Replace the file to change it. |

**Everything lives in ONE repository.** The public page and the admin page both read the same `data`
folder, so do not split them into two repositories, and you never need a separate page or repository
per student. Each person's public link is simply your site address plus their ID, for example
`https://YOUR-USERNAME.github.io/credentials/?id=AGF-2026-INT-7K3Q9X`.

## One-time setup (about 10 minutes)

1. Sign in to GitHub and create a **new public repository**, for example `credentials`.
2. Unzip the download. Open the `anon-credential-hub` folder so you can see `index.html`, `admin.html`,
   `assets`, `data` and `certs`. On the repository page choose **Add file → Upload files**, select all of
   those together and **drag them** onto the page (dragging is what keeps the folders), then press
   **Commit changes**. Afterwards the repository's first screen must show `index.html` and the `data` folder.
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**,
   branch **main**, folder **/ (root)**, then **Save**.
4. After a minute or two your site is live at `https://YOUR-USERNAME.github.io/credentials/`.
   - Public page: `https://YOUR-USERNAME.github.io/credentials/`
   - Your page: `https://YOUR-USERNAME.github.io/credentials/admin.html` (bookmark it)
5. Test it: open the public page and search for `AGF-2026-GEN-SAMPLE`. Delete
   `data/AGF-2026-GEN-SAMPLE.json` once your first real certificate is published.

## Issuing a certificate

1. Open `admin.html` and fill in the form, including the colour theme for the person's public page
   (white with blue & red, black & gold, or cream & gold). Press **Create certificate ID**.
2. You get an ID such as `AGF-2026-INT-7K3Q9X`, the public link, and a QR code.
3. Press **Download record file**. Upload that file to the `data` folder on GitHub
   (**Add file → Upload files → Commit changes**). You can upload many files at once.
4. Download the QR code and place it, with the ID, on the certificate in Canva.
5. Optional: export the finished certificate as a JPG named after the ID
   (`AGF-2026-INT-7K3Q9X.jpg`) and upload it to the `certs` folder. It then appears on the
   verification page with a download button.
6. Press **Check whether it is live**, then send the recipient the link
   (**Copy message for recipient** writes the message for you).

## Issuing many certificates at once

1. On `admin.html` choose **Many at once**.
2. Fill the boxes with what the whole batch shares (programme, certificate title, date, category, theme).
3. Copy the rows from Excel or Google Sheets, heading row included, and paste them into the list box.
   Only a `name` column is required; `organization`, `level`, `description`, `period`, `date` are optional.
4. Press **Check the list**, review the table, then **Create N certificates**.
5. Press **Download everything (.zip)** and unzip it. It contains:
   - `data/` : one record file per person. Upload all of these files to the `data` folder on GitHub in one go.
   - `qr/` : one QR image per person, named with the person's name and ID.
   - `certificates.csv` : name, ID, public link and QR file name for every person (for your designer).

## If a search says "Not found"

- **You opened `index.html` by double-clicking it on your computer.** Browsers do not allow a page opened
  that way to read the `data` folder. Use your `github.io` address instead.
- **The `data` folder is not in the repository**, or it is in a different repository from `index.html`.
  Check that `https://YOUR-USERNAME.github.io/credentials/data/AGF-2026-GEN-SAMPLE.json` opens.
- **The record was uploaded a moment ago.** Wait a minute or two and try again.

## Changing or revoking a certificate

On `admin.html`, under *Change or revoke an existing certificate*, enter the ID and press
**Load from site**. Change the details or set the status to **Revoked** (or **Superseded**, with the
ID of the replacement), press **Update**, download the record file again and upload it to `data`,
replacing the old one. The ID, link and QR code stay the same and now show the new status.

Do not delete a record to revoke it: a deleted record shows "Not found", a revoked one shows "Revoked".

## Adding a new category later

Open `assets/config.js` on GitHub, press the pencil icon, copy one of the category lines and give it a
new three-letter code, for example `{ code: 'AWD', label: 'Awards' },`. Commit. Done.

## Things to know

- **Everything in this repository is public**, because free GitHub Pages needs a public repository.
  Only put on a record what you are happy for anyone to read. No emails, phone numbers or private notes.
- **`admin.html` needs no password.** It only prepares files. Nothing becomes a real certificate
  until someone with access to your GitHub account uploads the record. Your GitHub login is the lock,
  so turn on two-factor authentication there.
- **IDs are random on purpose**, so nobody can guess other people's IDs by counting up.
- **Updates take a minute or two** to appear after you upload, and occasionally up to ten.
- **The register is the truth, not the image.** The page confirms that a record with that ID exists and
  shows who it was issued to. Verifiers should compare the name on the page with the certificate in hand.
- The list "Created in this browser" on the admin page is only a convenience and lives in that one
  browser. The `data` folder is the real register; GitHub keeps its full history.
