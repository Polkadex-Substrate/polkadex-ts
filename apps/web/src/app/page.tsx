"use client";

import { Button, Interaction, Logo, Modal, Typography } from "@polkadex/ux";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState(false);
  return (
    <main className="flex flex-col flex-1 ">
      <header className="flex justify-between items-center gap-5 border-b border-level-4 p-4">
        <div className="flex gap-5">
          <div>
            <Logo.Thea className="h-5 w-full" />
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/assets">Assets</Link>
            </li>
            <li>
              <Link href="/assets">Transactions</Link>
            </li>
            <li>
              <Link href="/assets">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <Modal
            closeOnClickOutside
            open={state}
            onOpenChange={setState}
            className="max-w-md flex flex-col gap-5"
          >
            <Modal.Title onBack={() => window.alert("Back action")}>
              <Interaction.Title onBack={() => window.alert("OnBack")}>
                Connect your wallet
              </Interaction.Title>
            </Modal.Title>
            <Modal.Content>Description</Modal.Content>
            <Modal.Footer>
              <Interaction.Footer>
                <Interaction.Action onClick={() => window.alert("....")}>
                  Action
                </Interaction.Action>
                <Interaction.Close onClick={() => window.alert("....")}>
                  Close
                </Interaction.Close>
              </Interaction.Footer>
            </Modal.Footer>
          </Modal>
          <Button.Primary onClick={() => setState(true)}>
            Connect wallet
          </Button.Primary>
        </div>
      </header>
      <div className="flex flex-col flex-1 items-center justify-center">
        <Typography.Heading>Content</Typography.Heading>
      </div>
      <footer className="p-4 text-center border-t border-level-4">
        Footer
      </footer>
    </main>
  );
}
